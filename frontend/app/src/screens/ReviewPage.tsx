import React from 'react';
import PageContainer from '../components/PageContainer';
import useURLQuery from '../hooks/useURLQuery';
import { useSmellsQuery } from '../hooks/queries/useSmellsQuery';
import { useReviewsQuery } from '../hooks/queries/useReviewsQuery';
import { useCreateReviewMutation } from '../hooks/mutations/useCreateReviewMutation';

function ReviewPage() {
    const query = useURLQuery();
    const taskId = query.get('taskId');
    const { data: smells } = useSmellsQuery();
    const { data: reviews } = useReviewsQuery();
    const { mutateAsync: createNewReview } = useCreateReviewMutation();

    const createNewReviewHandler = async () => {
        await createNewReview({ reviewed_smells: [], task_id: taskId ?? '' });
    };

    return (
        <PageContainer>
            <p>ReviewPage - taskId: {taskId}</p>
            <p>Reviews</p>
            {reviews?.map((review) => (
                <p>
                    {review._id} - {review.task_id}
                </p>
            ))}
            <button type="button" onClick={createNewReviewHandler}>
                Test creating a review
            </button>
        </PageContainer>
    );
}

export default ReviewPage;
