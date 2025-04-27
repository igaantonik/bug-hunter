from bson import ObjectId
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List

from app.models.utils import PyObjectId


class ReviewedSmell(BaseModel):
    id: Optional[PyObjectId] = Field(
        alias="_id",
        default_factory=lambda: str(ObjectId()),
    )
    file_id: PyObjectId = Field(alias="file_id")
    line: str = Field(
        ..., description="Line number in the file where the smell was found"
    )
    smell_id: PyObjectId = Field(alias="smell_id")
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "file_id": "file_id",
                "line": "1",
                "smell_id": "smell_id",
            }
        },
    )


class ReviewedSmellsCollection(BaseModel):
    smells: List[ReviewedSmell]
