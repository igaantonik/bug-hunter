from http.client import HTTPException

from fastapi import APIRouter, Query
from app.models.feedback import FeedbacksCollection, Feedback
from app.database import db
from bson import ObjectId

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


@feedback_router.get("/{feedback_id}", response_model=Feedback)
async def get_feedback(feedback_id: str):
    """
    Get a single feedback by its ID.
    - **feedback_id**: The ID of the feedback
    """
    feedback = await feedbacks_collection.find_one({"_id": ObjectId(feedback_id)})
    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found")
    return feedback


@feedback_router.put("/{feedback_id}", response_model=Feedback)
async def update_feedback(feedback_id: str, updated_feedback: Feedback):
    """
    Update a feedback by ID.
    - **feedback_id**: The ID of the feedback to update
    - **updated_feedback**: The new feedback data
    """
    updated_feedback.id = ObjectId(feedback_id)
    await feedbacks_collection.replace_one({"_id": ObjectId(feedback_id)}, updated_feedback.model_dump(by_alias=True))
    return await feedbacks_collection.find_one({"_id": ObjectId(feedback_id)})


@feedback_router.delete("/{feedback_id}", status_code=204)
async def delete_feedback(feedback_id: str):
    """
    Delete a feedback by ID.
    - **feedback_id**: The ID of the feedback to delete
    """
    result = await feedbacks_collection.delete_one({"_id": ObjectId(feedback_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Feedback not found")
