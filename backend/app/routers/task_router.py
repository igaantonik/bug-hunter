from fastapi import APIRouter, Query, HTTPException, UploadFile, Depends

from app.models.file import FileModel
from app.models.task import Task, TasksCollection
from app.database import db
from app.requests.task_create_request import TaskCreateRequest

task_router = APIRouter(
    prefix="/tasks",
    tags=["tasks"],
    responses={404: {"description": "Not found"}},
)

tasks_collection = db.tasks


@task_router.get("/", response_model=TasksCollection, status_code=200)
async def get_tasks(skip: int = Query(0, ge=0), limit: int = Query(10, ge=1)):
    """
    Get all tasks with pagination.
    - **skip**: Number of tasks to skip (default: 0)
    - **limit**: Number of tasks to return (default: 10)
    """
    tasks = await tasks_collection.find().skip(skip).limit(limit).to_list(limit)
    return TasksCollection(tasks=tasks)


@task_router.post("/", response_model=Task, status_code=201)
async def create_task(
    req: TaskCreateRequest = Depends(),
):
    """
    Create a new task.
    """
    files = req.files[0].split(",")
    file_ids = files

    task = Task(
        name=req.name,
        description=req.description,
        files=file_ids,
    )

    result = await tasks_collection.insert_one(
        task.model_dump(by_alias=True, exclude={"id"})
    )
    created = await tasks_collection.find_one({"_id": result.inserted_id})

    return Task(**created)
