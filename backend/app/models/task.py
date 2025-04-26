from pydantic import BaseModel, Field, ConfigDict
from pydantic.functional_validators import BeforeValidator
from typing_extensions import Annotated
from typing import Optional, List

PyObjectId = Annotated[str, BeforeValidator(str)]


class Task(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(..., description="Name of the task")
    description: str = Field(..., description="Description of the task")
    file: Optional[str] = Field(None, description="File with task")
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "name": "Task",
                "description": "This is simple task",
                "file": "string representing file content here",
            }
        },
    )


class TasksCollection(BaseModel):
    tasks: List[Task]
