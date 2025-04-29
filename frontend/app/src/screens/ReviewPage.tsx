import React from 'react';
import PageContainer from '../components/PageContainer';
import useURLQuery from '../hooks/useURLQuery';
import { useSmellsQuery } from '../hooks/queries/useSmellsQuery';

function ReviewPage() {
    const query = useURLQuery();
    const taskId = query.get('taskId');
    const { data: smells } = useSmellsQuery();

    return <PageContainer>ReviewPage - taskId: {taskId}</PageContainer>;
}

export default ReviewPage;
