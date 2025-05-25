import React from 'react';
import styled from 'styled-components';
import TaskCard from './TaskCard';
import { useTasksQuery } from '../../../hooks/queries/useTasksQuery';

const Container = styled.div`
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

function TasksGrid() {
    const { data: tasks } = useTasksQuery();

    return (
        <Container>
            {tasks?.map((task) => <TaskCard key={task._id} {...task} />)}
        </Container>
    );
}

export default TasksGrid;
