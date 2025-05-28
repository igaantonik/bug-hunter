import re
from typing import List
from bson import ObjectId
from fastapi import APIRouter, Depends, UploadFile, Query, HTTPException, Path
from app.models.file import FileModel, FileCollection
from app.models.smell_record import SmellRecord
from app.requests.file_create_request import FileCreateRequest
from app.database import db

file_router = APIRouter(
    prefix="/files", tags=["files"], responses={404: {"description": "Not found"}}
)

files_collection = db.files


@file_router.get("/", response_model=FileCollection, status_code=200)
async def get_files(skip: int = Query(0, ge=0), limit: int = Query(10, ge=1)):
    """
    Get all tasks with pagination.
    - **skip**: Number of tasks to skip (default: 0)
    - **limit**: Number of tasks to return (default: 10)
    """
    files = await files_collection.find().skip(skip).limit(limit).to_list(limit)
    return FileCollection(files=files)


@file_router.get("/{file_id}", response_model=FileModel)
async def get_file(file_id: str = Path(...)):
    """
    Get a single file by its ID.
    - **file_id**: The ID of the file
    """
    file = await files_collection.find_one({"_id": ObjectId(file_id)})
    if not file:
        raise HTTPException(status_code=404, detail="File not found")
    return file


@file_router.post("/", response_model=FileModel)
async def create_file_record(req: FileCreateRequest = Depends()):
    """
    Create a new file record.
    """

    lines = await _get_lines(req.file)
    predefined_smell_models = parse_serialized_smells(req.predefined_smells[0])

    file_model = FileModel(
        name=req.file.filename,
        lines=lines,
        smell_records=predefined_smell_models,
    )

    result = await files_collection.insert_one(
        file_model.model_dump(by_alias=True, exclude={"id"})
    )
    created = await files_collection.find_one({"_id": result.inserted_id})
    return created


async def _get_lines(file: UploadFile) -> dict[str, str]:
    """
    Parses the content of a file and returns a dictionary mapping line numbers to their content.
    """
    content = await file.read()
    text = content.decode("utf-8")
    lines = {}
    for i, line in enumerate(text.splitlines(), start=1):
        lines[str(i)] = line

    return lines


def parse_serialized_smells(input_str: str) -> List[SmellRecord]:
    """
    Parses a comma-separated list of smell record strings into a list of tuples.
    Each record is expected to be in the format: "[line1,line2,...];smell_id"
    Multiple records are comma-separated:
        Example: "[1,2,3];a1b2c3,[10,20,2,3];xxxxxxx"

    Returns:
        A list of tuples (list of line numbers, smell ID)
    """
    pattern = r"\[(.*?)\];([a-zA-Z0-9]+)"
    matches = re.findall(pattern, input_str)

    smells = []
    for lines_str, smell_id_str in matches:
        lines = [int(l.strip()) for l in lines_str.split(",") if l.strip()]
        smells.append({"lines": lines, "smell_id": smell_id_str})

    return smells


@file_router.put("/{file_id}", response_model=FileModel)
async def update_file(file_id: str, file_update: FileModel):
    """
    Update a file record by ID.
    - **file_id**: The ID of the file to update
    - **file_update**: The new file data
    """
    file_update.id = ObjectId(file_id)
    await files_collection.replace_one({"_id": ObjectId(file_id)}, file_update.model_dump(by_alias=True))
    updated = await files_collection.find_one({"_id": ObjectId(file_id)})
    return updated


@file_router.delete("/{file_id}", status_code=204)
async def delete_file(file_id: str):
    """
    Delete a file by ID.
    - **file_id**: The ID of the file to delete
    """
    result = await files_collection.delete_one({"_id": ObjectId(file_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="File not found")
