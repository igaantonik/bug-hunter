import React from 'react';
import styled from 'styled-components';
import { TASKS } from '../../../data/consts';
import TaskCard from './TaskCard';

const Container = styled.div`
    & > h2 {
        text-align: center;
        margin: 10px 0px 0px 0px;
    }
`;

const TasksGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    max-width: 80%;
    margin: 0 auto;
    gap: 20px;
    padding: 20px;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

function TasksGallery() {
    return (
        <Container>
            <h2>Available Tasks</h2>
            <TasksGrid>
                {TASKS.map((task, index) => (
                    <TaskCard key={index} {...task} />
                ))}
            </TasksGrid>
        </Container>
    );
}

export default TasksGallery;
