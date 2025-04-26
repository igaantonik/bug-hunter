from pydantic import BaseModel, Field, ConfigDict
from pydantic.functional_validators import BeforeValidator
from typing_extensions import Annotated
from typing import Optional, Dict

PyObjectId = Annotated[str, BeforeValidator(str)]


class FileModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(..., description="File name e.g. 'script.py'")
    # documents must have only string keys, so we can't use int as line key
    lines: Dict[str, str] = Field(
        ..., description="Mapping of line number (1-based) to the content of that line"
    )
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
            }
        },
    )
