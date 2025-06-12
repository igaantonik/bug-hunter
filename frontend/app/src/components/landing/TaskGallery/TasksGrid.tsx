import React from 'react';
import styled from 'styled-components';
import TaskCard from './TaskCard';
import { useTasksQuery } from '../../../hooks/api/queries/useTasksQuery';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 90%;
  margin: 0 auto;
  gap: 24px;
  padding: 10px;
`;

const NoTasksContainer = styled.div`
  display: flex;
  justify-content: center;
`;

function TasksGrid() {
  const { data: tasks = [] } = useTasksQuery();

  if (tasks.length === 0) {
    return (
      <NoTasksContainer>
        <p>Currently there are no available tasks :(</p>
      </NoTasksContainer>
    );
  }

  return (
    <Container>
      {tasks.map((task) => (
        <TaskCard key={task._id} {...task} />
      ))}
    </Container>
  );
}

export default TasksGrid;
