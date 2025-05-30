from fastapi import APIRouter, Query
from app.models.feedback import FeedbacksCollection
from app.database import db

feedback_router = APIRouter(
    prefix="/feedbacks",
    tags=["feedbacks"],
    responses={404: {"description": "Not found"}},
)

feedbacks_collection = db.feedbacks
reviews_collection = db.reviews
tasks_collection = db.tasks
files_collection = db.files


@feedback_router.get("/", response_model=FeedbacksCollection, status_code=200)
async def get_feedbacks(skip: int = Query(0, ge=0), limit: int = Query(10, ge=1)):
    """
    Get all feedbacks with pagination.
    - **skip**: Number of feedbacks to skip (default: 0)
    - **limit**: Number of feedbacks to return (default: 10)
    """
    feedbacks = await feedbacks_collection.find().skip(skip).limit(limit).to_list(limit)
    return FeedbacksCollection(feedbacks=feedbacks)
