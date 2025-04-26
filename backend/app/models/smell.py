from pydantic import BaseModel, Field, ConfigDict
from pydantic.functional_validators import BeforeValidator
from typing_extensions import Annotated
from typing import Optional, List

PyObjectId = Annotated[str, BeforeValidator(str)]


class Smell(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(..., description="Name of the smell")
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "name": "Code duplication",
            }
        },
    )


class SmellsCollection(BaseModel):
    smells: List[Smell]
