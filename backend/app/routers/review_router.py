from fastapi import APIRouter, Body, Query

from app.models.review import Review, ReviewsCollection
from app.database import db

review_router = APIRouter(
    prefix="/reviews",
    tags=["reviews"],
    responses={404: {"description": "Not found"}},
)

reviews_collection = db.reviews


@review_router.get("/", response_model=ReviewsCollection, status_code=200)
async def get_reviews(skip: int = Query(0, ge=0), limit: int = Query(10, ge=1)):
    """
    Get all reviews with pagination.
    - **skip**: Number of reviews to skip (default: 0)
    - **limit**: Number of reviews to return (default: 10)
    """
    reviews = await reviews_collection.find().skip(skip).limit(limit).to_list(limit)
    return ReviewsCollection(reviews=reviews)


@review_router.post("/", response_model=Review, status_code=201)
async def create_review(review: Review = Body(...)):
    """
    Create a new review.
    """
    data = review.model_dump(by_alias=True, exclude={"id"})
    new_review = await reviews_collection.insert_one(data)
    created_review = await reviews_collection.find_one({"_id": new_review.inserted_id})

    return created_review
