from fastapi import APIRouter, Body, Query
from app.models.feedback import Feedback, FeedbacksCollection
from app.database import db

feedback_router = APIRouter(
    prefix="/feedbacks",
    tags=["feedbacks"],
    responses={404: {"description": "Not found"}},
)

feedbacks_collection = db.feedbacks


@feedback_router.get("/", response_model=FeedbacksCollection, status_code=200)
async def get_feedbacks(skip: int = Query(0, ge=0), limit: int = Query(10, ge=1)):
    """
    Get all feedbacks with pagination.
    - **skip**: Number of feedbacks to skip (default: 0)
    - **limit**: Number of feedbacks to return (default: 10)
    """
    feedbacks = await feedbacks_collection.find().skip(skip).limit(limit).to_list(limit)
    return FeedbacksCollection(feedbacks=feedbacks)


@feedback_router.post("/", response_model=Feedback, status_code=201)
async def create_feedback(feedback: Feedback = Body(...)):
    """
    Create a new feedback.
    """

    new_feedback = await feedbacks_collection.insert_one(
        feedback.model_dump(by_alias=True, exclude={"id"})
    )
    created_feedback = await feedbacks_collection.find_one(
        {"_id": new_feedback.inserted_id}
    )

    return created_feedback
