from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from app.models.utils import PyObjectId

class TaskGroup(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(..., description="Name of the task group")
    access_code: str = Field(..., description="Access code for joining the group")
    owner_id: PyObjectId = Field(..., description="ID of the group creator (User._id)")
    tasks: List[PyObjectId] = Field(
        default_factory=list, description="List of task IDs in the group"
    )
    user_ids: List[str] = Field(
        default_factory=list, description="List of user IDs in the group"
    )

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "name": "Group 1",
                "access_code": "ABC123",
                "owner_id": "665f3b1f5d3e8d12abef3210",
                "tasks": [
                    "665f3b1f5d3e8d12abef3211",
                    "665f3b1f5d3e8d12abef3212"
                ],
                "user_ids": [
                    "john123",
                    "adam567"
                ],
            }
        },
    )


class TaskGroupsCollection(BaseModel):
    groups: List[TaskGroup]
