from fastapi import APIRouter, Query, Depends, HTTPException
from bson import ObjectId
from app.models.task import Task, TasksCollection
from app.database import tasks_collection
from app.requests.task_create_request import TaskCreateRequest

task_router = APIRouter(
    prefix="/tasks",
    tags=["tasks"],
    responses={404: {"description": "Not found"}},
)


@task_router.get("/", response_model=TasksCollection, status_code=200)
async def get_tasks(skip: int = Query(0, ge=0), limit: int = Query(10, ge=1)):
    """
    Get all tasks with pagination.
    - **skip**: Number of tasks to skip (default: 0)
    - **limit**: Number of tasks to return (default: 10)
    """
    tasks = await tasks_collection.find().skip(skip).limit(limit).to_list(limit)
    return TasksCollection(tasks=tasks)


@task_router.get("/{task_id}", response_model=Task)
async def get_task(task_id: str):
    """
    Get a single task by its ID.
    - **task_id**: The ID of the task
    """
    task = await tasks_collection.find_one({"_id": ObjectId(task_id)})
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


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


@task_router.put("/{task_id}", response_model=Task)
async def update_task(task_id: str, updated_task: Task):
    """
    Update a task by ID.
    - **task_id**: The ID of the task to update
    - **updated_task**: The new task data
    """
    updated_task.id = ObjectId(task_id)
    await tasks_collection.replace_one(
        {"_id": ObjectId(task_id)}, updated_task.model_dump(by_alias=True)
    )
    return await tasks_collection.find_one({"_id": ObjectId(task_id)})


@task_router.delete("/{task_id}", status_code=204)
async def delete_task(task_id: str):
    """
    Delete a task by ID.
    - **task_id**: The ID of the task to delete
    """
    result = await tasks_collection.delete_one({"_id": ObjectId(task_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
