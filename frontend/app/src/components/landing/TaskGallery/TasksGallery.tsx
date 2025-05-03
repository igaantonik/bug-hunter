import React from 'react';
import styled from 'styled-components';
import TasksGrid from './TasksGrid';
import SuspenseWithErrorBoundary from '../../SuspenseWithErrorBoundary';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    h2 {
        text-align: center;
        margin: 10px 0px 0px 0px;
    }
`;

function TasksGallery() {
    return (
        <Container>
            <h2>Available Tasks</h2>
            <SuspenseWithErrorBoundary>
                <TasksGrid />
            </SuspenseWithErrorBoundary>
        </Container>
    );
}

export default TasksGallery;
