from fastapi import APIRouter, Body, Query, HTTPException
from app.models.task import Task, TasksCollection
from app.database import db

task_router = APIRouter(
    prefix="/tasks",
    tags=["tasks"],
    responses={404: {"description": "Not found"}},
)

tasks_collection = db.tasks


@task_router.get("/", response_model=TasksCollection, status_code=200)
async def get_tasks(skip: int = Query(0, qe=0), limit: int = Query(10, ge=1)):
    """
    Get all tasks with pagination.
    - **skip**: Number of tasks to skip (default: 0)
    - **limit**: Number of tasks to return (default: 10)
    """
    tasks = await tasks_collection.find().skip(skip).limit(limit).to_list(limit)
    return TasksCollection(tasks=tasks)


# internal code - for adding
# TODO
path_to_local_file = "path/to/local/file.txt"


async def read_local_file(file_path: str = path_to_local_file) -> str:
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return file.read()
    except Exception as e:
        raise HTTPException(
            status_code=400, detail=f"Failed to read the local file: {str(e)}"
        )


@task_router.post("/", response_model=Task, status_code=201)
async def create_task(task: Task = Body(...)):
    """
    Create a new task.
    """
    if not task.file:
        file = await read_local_file()
        task.file = file

    new_task = await tasks_collection.insert_one(
        task.model_dump(by_alias=True, exclude=["id"])
    )
    created_task = await tasks_collection.find_one({"_id": new_task.inserted_id})

    return created_task
