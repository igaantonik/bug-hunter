from fastapi import APIRouter, HTTPException, Query, Body
from typing import List
from bson import ObjectId
import random, string

from app.models.task_group import TaskGroup, TaskGroupsCollection
from app.models.task import Task
from app.models.utils import PyObjectId
from app.database import task_groups_collection

task_groups_router = APIRouter(
    prefix="/task_groups",
    tags=["task_groups"],
    responses={404: {"description": "Not found"}},
)


def generate_access_code(length=6):
    return "".join(random.choices(string.ascii_uppercase + string.digits, k=length))


@task_groups_router.get("/", response_model=TaskGroupsCollection, status_code=200)
async def get_task_groups(skip: int = Query(0, ge=0), limit: int = Query(10, ge=1)):
    groups = (
        await task_groups_collection.find()
        .skip(skip)
        .limit(limit)
        .to_list(length=limit)
    )
    return TaskGroupsCollection(groups=groups)


@task_groups_router.get("/{group_id}", response_model=TaskGroup)
async def get_task_group(group_id: str):
    group = await task_groups_collection.find_one({"_id": ObjectId(group_id)})
    if not group:
        raise HTTPException(status_code=404, detail="Task group not found")
    return TaskGroup(**group)


@task_groups_router.post("/", response_model=TaskGroup, status_code=201)
async def create_task_group(group_data: TaskGroup = Body(...)):
    group_data.access_code = generate_access_code()
    group_data.user_ids = []

    result = await task_groups_collection.insert_one(
        group_data.model_dump(by_alias=True, exclude={"id"})
    )
    group_data.id = result.inserted_id
    print("new group created", group_data.dict())
    return group_data.dict()


@task_groups_router.post("/join/{access_code}", response_model=TaskGroup)
async def join_task_group(access_code: str, user_id: str = Body(...)):
    group = await task_groups_collection.find_one({"access_code": access_code})
    if not group:
        raise HTTPException(status_code=404, detail="Task group not found")

    group_model = TaskGroup(**group)

    if user_id in group_model.user_ids:
        raise HTTPException(status_code=400, detail="User already joined")

    group_model.user_ids.append(user_id)
    await task_groups_collection.update_one(
        {"_id": ObjectId(group_model.id)}, {"$set": {"user_ids": group_model.user_ids}}
    )
    found = await task_groups_collection.find_one({"_id": group_model.id})
    return group_model


@task_groups_router.post("/{group_id}/add_task", response_model=TaskGroup)
async def add_task_to_group(group_id: str, task: Task):
    group = await task_groups_collection.find_one({"_id": ObjectId(group_id)})
    if not group:
        raise HTTPException(status_code=404, detail="Task group not found")

    group_model = TaskGroup(**group)

    task.id = PyObjectId()

    group_model.tasks.append(task)

    await task_groups_collection.update_one(
        {"_id": group_model.id},
        {"$set": {"tasks": [t.model_dump(by_alias=True) for t in group_model.tasks]}},
    )

    return group_model


@task_groups_router.put("/{group_id}", response_model=TaskGroup)
async def update_task_group(group_id: str, updated_group: TaskGroup):
    updated_group.id = ObjectId(group_id)
    await task_groups_collection.replace_one(
        {"_id": ObjectId(group_id)}, updated_group.model_dump(by_alias=True)
    )
    return await task_groups_collection.find_one({"_id": ObjectId(group_id)})


@task_groups_router.delete("/{group_id}", status_code=204)
async def delete_task_group(group_id: str):
    result = await task_groups_collection.delete_one({"_id": ObjectId(group_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task group not found")
