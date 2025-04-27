from pydantic import BaseModel, Field
from typing import Optional, List

from app.models.reviewed_smell import ReviewedSmell
from app.models.utils import PyObjectId


class Review(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    task_id: PyObjectId = Field(alias="task_id")
    reviewed_smells: List[ReviewedSmell] = Field(
        alias="reviewed_smells",
        default_factory=list,
    )


class ReviewsCollection(BaseModel):
    reviews: List[Review]
