from pydantic import BaseModel, Field
from typing import Optional, List

from app.models.utils import PyObjectId


class Feedback(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    review_id: PyObjectId = Field(alias="review_id")
    # TODO(#51)
    score: int = Field(alias="score")


class FeedbacksCollection(BaseModel):
    feedbacks: List[Feedback]
