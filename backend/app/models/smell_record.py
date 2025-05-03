from bson import ObjectId
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List

from app.models.utils import PyObjectId


class SmellRecord(BaseModel):
    id: Optional[PyObjectId] = Field(
        default=None,
        alias="_id",
    )
    line: str = Field(
        ..., description="Line number in the file where the smell was found"
    )
    smell_id: PyObjectId = Field(alias="smell_id")
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "line": "1",
                "smell_id": "661babc123...",
            }
        },
    )



class SmellRecordsCollection(BaseModel):
    smells: List[SmellRecord]
