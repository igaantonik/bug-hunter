from fastapi import APIRouter, Body, Query, HTTPException
from app.models.smell import Smell, SmellsCollection
from app.database import db
from bson import ObjectId

smell_router = APIRouter(
    prefix="/smells",
    tags=["smells"],
    responses={404: {"description": "Not found"}},
)

smells_collection = db.smells


@smell_router.get("/", response_model=SmellsCollection, status_code=200)
async def get_smells(skip: int = Query(0, ge=0), limit: int = Query(10, ge=1)):
    """
    Get all smells with pagination.
    - **skip**: Number of smells to skip (default: 0)
    - **limit**: Number of smells to return (default: 10)
    """
    smells = await smells_collection.find().skip(skip).limit(limit).to_list(limit)
    return SmellsCollection(smells=smells)


@smell_router.get("/{smell_id}", response_model=Smell)
async def get_smell(smell_id: str):
    """
    Get a single smell by its ID.
    - **smell_id**: The ID of the smell
    """
    smell = await smells_collection.find_one({"_id": ObjectId(smell_id)})
    if not smell:
        raise HTTPException(status_code=404, detail="Smell not found")
    return smell


@smell_router.post("/", response_model=Smell, status_code=201)
async def create_smell(smell: Smell = Body(...)):
    """
    Create a new smell.
    """

    new_smell = await smells_collection.insert_one(
        smell.model_dump(by_alias=True, exclude={"id"})
    )
    created_smell = await smells_collection.find_one({"_id": new_smell.inserted_id})

    return created_smell


@smell_router.put("/{smell_id}", response_model=Smell)
async def update_smell(smell_id: str, updated_smell: Smell):
    """
    Update a smell by ID.
    - **smell_id**: The ID of the smell to update
    - **updated_smell**: The new smell data
    """
    updated_smell.id = ObjectId(smell_id)
    await smells_collection.replace_one({"_id": ObjectId(smell_id)}, updated_smell.model_dump(by_alias=True))
    return await smells_collection.find_one({"_id": ObjectId(smell_id)})


@smell_router.delete("/{smell_id}", status_code=204)
async def delete_smell(smell_id: str):
    """
    Delete a smell by ID.
    - **smell_id**: The ID of the smell to delete
    """
    result = await smells_collection.delete_one({"_id": ObjectId(smell_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Smell not found")

