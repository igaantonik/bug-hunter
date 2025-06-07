from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List

from app.models.review_mistake import ReviewMistake
from app.models.utils import PyObjectId


class Feedback(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    review_id: PyObjectId = Field(alias="review_id")
    score: int = Field(alias="score")
    max_score: int = Field(alias="max_score")
    mistakes: Optional[List[ReviewMistake]] = None
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "review_id": "661babc123...",
                "score": "15",
                "max_score": "20",
            }
        },
    )


class FeedbacksCollection(BaseModel):
    feedbacks: List[Feedback]
