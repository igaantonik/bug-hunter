from fastapi import APIRouter, Depends, UploadFile, Query
from app.models.file import FileModel, FileCollection
from app.requests.file_create_request import FileCreateRequest
from app.database import db

file_router = APIRouter(
    prefix="/files",
    tags=["files"],
    responses={404: {"description": "Not found"}}
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


@file_router.post("/", response_model=FileModel)
async def create_file_record(
        req: FileCreateRequest = Depends()
):
    """
    Create a new file record.
    """

    lines = await _get_lines(req.file)
    smells = req.predefined_smells[0].split(",")
    predefined_smell_models = [
        parse_smell_record(smell) for smell in smells
    ]

    file_model = FileModel(
        name=req.file.filename,
        lines=lines,
        smell_records=predefined_smell_models, )

    result = await files_collection.insert_one(file_model.model_dump(by_alias=True, exclude={"id"}))
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


def parse_smell_record(smell: str) -> dict:
    """
    Parses a semicolon-delimited smell record string into a structured dictionary.
    Expected format:
    "line;smell_id"
    """

    parts = smell.split(';')
    return {
        "line": parts[0],
        "smell_id": parts[1]
    }
