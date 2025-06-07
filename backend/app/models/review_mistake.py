from pydantic import BaseModel
from typing import Literal
from app.models.utils import PyObjectId


class ReviewMistake(BaseModel):
    mistake_type: Literal["not_selected", "badly_selected"]
    line: int
    file_id: PyObjectId
    review_id: PyObjectId
    correct_smell_id: PyObjectId
