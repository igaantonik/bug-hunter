from fastapi import APIRouter, Body, Query
from app.models.smell import Smell, SmellsCollection
from app.database import db

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
