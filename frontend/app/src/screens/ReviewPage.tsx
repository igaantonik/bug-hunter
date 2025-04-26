import React from 'react';
import PageContainer from '../components/PageContainer';
import useQuery from '../hooks/useQuery';

function ReviewPage() {
    const query = useQuery();
    const reviewId = query.get('reviewId');
    return <PageContainer>ReviewPage - reviewId: {reviewId}</PageContainer>;
}

export default ReviewPage;
