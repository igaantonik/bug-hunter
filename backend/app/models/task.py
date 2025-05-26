from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List

from app.models.utils import PyObjectId


class Task(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(..., description="Name of the task")
    description: str = Field(..., description="Description of the task")
    files: List[str] = Field(
        default_factory=list,
        description="List of files associated with the task",
    )
    allowed_time: int = Field(
        default=0,
        description="Allowed time for the task in seconds. 0 means no limit",
    )
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "name": "Task",
                "description": "This is simple task",
                "files": ["file_id_1", "file_id_2", "file_id_3"],
                "allowed_time": 3600,
            }
        },
    )


class TasksCollection(BaseModel):
    tasks: List[Task]
