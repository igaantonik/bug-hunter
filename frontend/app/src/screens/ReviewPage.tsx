import React from 'react';
import PageContainer from '../components/PageContainer';
import useURLQuery from '../hooks/useQuery';

function ReviewPage() {
    const query = useURLQuery();
    const taskId = query.get('taskId');
    return <PageContainer>ReviewPage - taskId: {taskId}</PageContainer>;
}

export default ReviewPage;
