from bson import ObjectId
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List

from app.models.utils import PyObjectId


class SmellRecord(BaseModel):
    id: Optional[PyObjectId] = Field(
        default=None,
        alias="_id",
    )
    lines: List[int] = Field(
        ...,
        description="List of line numbers in the file where the smell occurs",
        min_length=1,
    )
    smell_id: PyObjectId = Field(alias="smell_id")
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "lines": [1, 2, 3],
                "smell_id": "661babc123...",
            }
        },
    )


class SmellRecordsCollection(BaseModel):
    smells: List[SmellRecord]
