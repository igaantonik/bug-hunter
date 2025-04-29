import React from 'react';
import styled from 'styled-components';
import TasksGrid from './TasksGrid';
import SuspenseWrapper from '../../SuspenseWrapper';

const Container = styled.div`
    h2 {
        text-align: center;
        margin: 10px 0px 0px 0px;
    }
`;

function TasksGallery() {
    return (
        <Container>
            <h2>Available Tasks</h2>
            <SuspenseWrapper>
                <TasksGrid />
            </SuspenseWrapper>
        </Container>
    );
}

export default TasksGallery;
