from pydantic import BaseModel, Field
from typing import Optional, List

from app.models.smell_record import SmellRecord
from app.models.utils import PyObjectId


class Review(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    task_id: PyObjectId = Field(alias="task_id")
    reviewed_smells: List[SmellRecord] = Field(
        alias="reviewed_smells",
        default_factory=list,
    )
    username: str = Field(
        alias="username",
        description="Username of the reviewer",
    )
    time: int = Field(
        alias="time",
        description="Time taken for the review in seconds",
    )


class ReviewsCollection(BaseModel):
    reviews: List[Review]
