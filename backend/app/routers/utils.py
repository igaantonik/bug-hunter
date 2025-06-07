from typing import List
from bson import ObjectId
from app.models.feedback import Feedback
from app.models.review import Review
from app.database import (
    reviews_collection,
    tasks_collection,
    files_collection,
    feedbacks_collection,
)
from app.models.review_mistake import ReviewMistake


async def get_feedback_mistakes(feedback_id: str) -> List[ReviewMistake]:
    """
    Generate mistakes list (not_selected, badly_selected) for given feedback.
    Removes not_selected duplicates if there's also badly_selected for same target.
    """
    result: List[ReviewMistake] = []

    feedback_doc = await feedbacks_collection.find_one({"_id": ObjectId(feedback_id)})
    if not feedback_doc:
        return []

    feedback = Feedback(**feedback_doc)

    review_doc = await reviews_collection.find_one(
        {"_id": ObjectId(feedback.review_id)}
    )
    if not review_doc:
        return []

    review = Review(**review_doc)

    task_doc = await tasks_collection.find_one({"_id": ObjectId(review.task_id)})
    if not task_doc:
        return []

    file_ids = task_doc["files"]
    file_docs = []
    for fid in file_ids:
        f = await files_collection.find_one({"_id": ObjectId(fid)})
        if f:
            file_docs.append(f)

    # Map reviewed_smells: file_id -> smell_id -> set(lines)
    reviewed_map = {}
    for smell in review.reviewed_smells:
        file_id = str(smell.file_id)
        smell_id = str(smell.smell_id)
        reviewed_map.setdefault(file_id, {}).setdefault(smell_id, set()).update(
            smell.lines
        )

    # Generate errors
    for file in file_docs:
        file_id = str(file["_id"])
        reviewed_file = reviewed_map.get(file_id, {})
        smell_records = file.get("smell_records", [])

        # valid_smell_ids in this file
        valid_smell_ids = {str(sr["smell_id"]) for sr in smell_records}

        # 1. normal comparison for matching smell_ids
        for smell_record in smell_records:
            smell_id = str(smell_record["smell_id"])
            correct_lines = set(smell_record["lines"])
            selected_lines = reviewed_file.get(smell_id, set())

            not_selected = correct_lines - selected_lines
            badly_selected = selected_lines - correct_lines

            for line in not_selected:
                result.append(
                    ReviewMistake(
                        mistake_type="not_selected",
                        line=line,
                        file_id=ObjectId(file_id),
                        review_id=ObjectId(review.id),
                        correct_smell_id=ObjectId(smell_id),
                    )
                )

            for line in badly_selected:
                result.append(
                    ReviewMistake(
                        mistake_type="badly_selected",
                        line=line,
                        file_id=ObjectId(file_id),
                        review_id=ObjectId(review.id),
                        correct_smell_id=ObjectId(smell_id),
                    )
                )

        # 2. smells selected by reviewer that don't exist in this file
        reviewed_smell_ids = set(reviewed_file.keys())
        extra_smell_ids = reviewed_smell_ids - valid_smell_ids

        for extra_smell_id in extra_smell_ids:
            extra_lines = reviewed_file[extra_smell_id]
            for line in extra_lines:
                result.append(
                    ReviewMistake(
                        mistake_type="badly_selected",
                        line=line,
                        file_id=ObjectId(file_id),
                        review_id=ObjectId(review.id),
                        correct_smell_id=ObjectId(extra_smell_id),
                    )
                )

    # Deduplicate: prefer badly_selected over not_selected
    deduped = {}
    for err in result:
        key = (err.file_id, err.line, err.review_id, err.correct_smell_id)
        if key not in deduped:
            deduped[key] = err
        elif (
            deduped[key]["error_type"] == "not_selected"
            and err["error_type"] == "badly_selected"
        ):
            deduped[key] = err

    return list(deduped.values())


if __name__ == "__main__":
    import asyncio

    async def main():
        feedback_id = "6839b2a346ba1806a2731d30"
        errors = await get_feedback_mistakes(feedback_id)
        for err in errors:
            print(err)

    asyncio.run(main())
