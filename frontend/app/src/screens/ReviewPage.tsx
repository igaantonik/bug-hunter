import React from 'react';
import PageContainer from '../components/PageContainer';
import useQuery from '../hooks/useQuery';

function ReviewPage() {
    const query = useQuery();
    const taskId = query.get('taskId');
    return <PageContainer>ReviewPage - taskId: {taskId}</PageContainer>;
}

export default ReviewPage;
