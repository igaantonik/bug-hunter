from bson import ObjectId
from fastapi import APIRouter, Body, Query, HTTPException

from app.models.feedback import Feedback
from fastapi import APIRouter, Body, Query, HTTPException
from bson import ObjectId
from app.models.review import Review, ReviewsCollection
from app.database import (
    db,
    reviews_collection,
    tasks_collection,
    feedbacks_collection,
    files_collection,
)
from app.models.task import Task
from app.routers.utils import get_feedback_mistakes

review_router = APIRouter(
    prefix="/reviews",
    tags=["reviews"],
    responses={404: {"description": "Not found"}},
)


@review_router.get("/", response_model=ReviewsCollection, status_code=200)
async def get_reviews(skip: int = Query(0, ge=0), limit: int = Query(10, ge=1)):
    """
    Get all reviews with pagination.
    - **skip**: Number of reviews to skip (default: 0)
    - **limit**: Number of reviews to return (default: 10)
    """
    reviews = await reviews_collection.find().skip(skip).limit(limit).to_list(limit)
    return ReviewsCollection(reviews=reviews)


@review_router.get("/{review_id}", response_model=Review)
async def get_review(review_id: str):
    """
    Get a single review by its ID.
    - **review_id**: The ID of the review
    """
    review = await reviews_collection.find_one({"_id": ObjectId(review_id)})
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    return review


@review_router.post("/", response_model=Feedback, status_code=201)
async def create_review(review: Review = Body(...)):
    """
    Create a new review.
    """
    data = review.model_dump(by_alias=True, exclude={"id"})
    new_review = await reviews_collection.insert_one(data)
    created_review = await reviews_collection.find_one({"_id": new_review.inserted_id})
    created_review = Review(**created_review)
    return await _create_feedback(created_review)


async def _create_feedback(review: Review) -> Feedback:
    task = await tasks_collection.find_one({"_id": ObjectId(review.task_id)})
    if not task:
        raise HTTPException(
            status_code=404,
            detail=f"Task with id {review.task_id} not found.",
        )
    task = Task(**task)

    score, max_score = await _calculate_score(task, review)
    feedback = Feedback(review_id=review.id, score=score, max_score=max_score)
    new_feedback = await feedbacks_collection.insert_one(
        feedback.model_dump(by_alias=True, exclude={"id", "review_mistakes"})
    )
    created_feedback = await feedbacks_collection.find_one(
        {"_id": new_feedback.inserted_id}
    )
    created_feedback = Feedback(**created_feedback)
    created_feedback.mistakes = await get_feedback_mistakes(feedback.id)
    return created_feedback


async def _calculate_score(task: Task, review: Review) -> tuple[int, int]:
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
        file = await files_collection.find_one({"_id": ObjectId(file_id)})
        if not file or file_id not in review_answers:
            continue

        smell_records = file["smell_records"]

        for smell_record in smell_records:
            answers = (
                review_answers[file_id][smell_record["smell_id"]]
                if smell_record["smell_id"] in review_answers[file_id]
                else set()
            )

            max_score += len(smell_record["lines"]) + 1
            tmp_score = 2 * len(answers.intersection(smell_record["lines"])) - len(
                smell_record["lines"]
            )

            if tmp_score == len(smell_record["lines"]):
                score += 1

            score += tmp_score

    return score, max_score


@review_router.put("/{review_id}", response_model=Review)
async def update_review(review_id: str, updated_review: Review = Body(...)):
    """
    Update a review by its ID.
    - **review_id**: The ID of the review
    """
    updated_review.id = ObjectId(review_id)
    await reviews_collection.replace_one(
        {"_id": ObjectId(review_id)}, updated_review.model_dump(by_alias=True)
    )
    return await reviews_collection.find_one({"_id": ObjectId(review_id)})


@review_router.delete("/{review_id}", status_code=204)
async def delete_review(review_id: str):
    """
    Delete a review by its ID.
    - **review_id**: The ID of the review
    """
    result = await reviews_collection.delete_one({"_id": ObjectId(review_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Review not found")
