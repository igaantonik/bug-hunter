from fastapi import APIRouter, Body, HTTPException, Query
from app.models.feedback import Feedback, FeedbacksCollection
from app.models.task import Task
from app.models.review import Review
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


@feedback_router.post("/", response_model=Feedback, status_code=201)
async def create_feedback(review_id: int = Body(...)):
    """
    Create a new feedback.
    """

    review = await reviews_collection.find_one({"_id": review_id})

    if not review:
        raise HTTPException(
            status_code=404,
            detail=f"Review with id {review_id} not found.",
        )

    task = await tasks_collection.find_one({"_id": review.task_id})

    if not task:
        raise HTTPException(
            status_code=404,
            detail=f"Task with id {review.task_id} not found.",
        )

    score, max_score = await _calculate_score(task, review)

    feedback = Feedback(review_id=review_id, score=score, max_score=max_score)

    new_feedback = await feedbacks_collection.insert_one(
        feedback.model_dump(by_alias=True, exclude={"id"})
    )
    created_feedback = await feedbacks_collection.find_one(
        {"_id": new_feedback.inserted_id}
    )

    return created_feedback


async def _calculate_score(task: Task, review: Review) -> int:
    """
    Calculate the score based on the task and review.
    For each correct match between line in the file and the smell +1 and for fully correct identified smell +1.
    """

    score = 0
    max_score = 0

    file_ids = task.files
    reviewed_smells = review.reviewed_smells

    review_answers = dict()

    for reviewed_smell in reviewed_smells:
        if reviewed_smell.file_id not in review_answers:
            review_answers[reviewed_smell.file_id] = dict()

        review_answers[reviewed_smell.file_id][reviewed_smell.smell_id] = set(
            reviewed_smell.lines
        )

    for file_id in file_ids:
        file = await files_collection.find_one({"_id": file_id})

        if not file or file_id not in review_answers:
            continue

        smell_records = file.smell_records

        for smell_record in smell_records:
            answers = (
                review_answers[file_id][smell_record.smell_id]
                if smell_record.smell_id in review_answers[file_id]
                else set()
            )

            max_score += len(smell_record.lines)
            tmp_score = len(answers.intersection(smell_record.lines))

            if tmp_score == len(smell_record.lines):
                score += 1

            score += tmp_score

    return score, max_score


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
