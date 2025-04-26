import React from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '../components/PageContainer';

function TaskPage() {
    const { taskId } = useParams();
    return <PageContainer>TaskPage - taskId: {taskId}</PageContainer>;
}

export default TaskPage;
