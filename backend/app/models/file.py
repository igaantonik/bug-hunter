from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, Dict, List
from app.models.utils import PyObjectId
from app.models.smell_record import SmellRecord


class FileModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(..., description="File name e.g. 'script.py'")
    # documents must have only string keys, so we can't use int as line key
    lines: Dict[str, str] = Field(
        ..., description="Mapping of line number (1-based) to the content of that line"
    )
    smell_records: List[SmellRecord] = Field(default_factory=list)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "name": "script.py",
                "lines": {
                    "1": "def hello_world():",
                    "2": "    print('Hello, world!')",
                    "3": "",
                    "4": "hello_world()",
                },
                "smell_records": [
                    {
                        "line": "1",
                        "smell_id": "smell_id"
                    }
                ]
            }
        },
    )


class FileCollection(BaseModel):
    files: List[FileModel]
