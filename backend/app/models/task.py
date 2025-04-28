from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List

from app.models.file import FileModel
from app.models.utils import PyObjectId
from app.models.smell_record import SmellRecord


class Task(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(..., description="Name of the task")
    description: str = Field(..., description="Description of the task")
    files: List[FileModel] = Field(
        default_factory=list,
        description="List of files associated with the task",
    )
    predefined_smells: List[SmellRecord] = Field(
        alias="predefined_smells",
        default_factory=list,
    )
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "name": "Task",
                "description": "This is simple task",
                "file": "string representing file content here",
                "files": [
                    {
                        "name": "script.py",
                        "lines": {
                            1: "def hello_world():",
                            2: "    print('Hello, world!')",
                            3: "",
                            4: "hello_world()",
                        },
                    }
                ],
                "predefined_smells": [
                    {
                        "file_id": "file_id",
                        "line": "1",
                        "smell_id": "smell_id",
                    },
                    {
                        "file_id": "file_id",
                        "line": "7",
                        "smell_id": "smell_id",
                    },
                ],
            }
        },
    )


class TasksCollection(BaseModel):
    tasks: List[Task]
