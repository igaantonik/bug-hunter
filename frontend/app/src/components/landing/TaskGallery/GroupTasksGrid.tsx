import styled from 'styled-components';
import { useTaskGroupsQuery } from '../../../hooks/api/queries/useTaskGroupsQuery';
import { useTasksQuery } from '../../../hooks/api/queries/useTasksQuery';
import { TaskGroup, Task } from '../../../types';
import TaskCard from './TaskCard';
import useUserStore from '../../../store/useUserStore.ts';

const Container = styled.div`
    width: 80%;
    margin: 0 auto;
    padding: 20px;
`;

const GroupContainer = styled.div`
    margin-bottom: 40px;
`;

const GroupHeader = styled.h2`
    margin-bottom: 10px;
    color: #333;
`;

const TasksGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const NoTasksContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 40px;
`;

function GroupTasksGrid() {
    const { data: taskGroups } = useTaskGroupsQuery();
    const { data: allTasks } = useTasksQuery();

    const {username} = useUserStore();

    if (!taskGroups || taskGroups.length === 0) {
        return (
            <NoTasksContainer>
                <p>Currently there are no available task groups :(</p>
            </NoTasksContainer>
        );
    }
    console.log("username", username)
    // Filtrujemy grupy dla zalogowanego usera
    // Filtrujemy grupy dla zalogowanego usera
    const userGroups = taskGroups.filter(group => group.user_ids.includes(username!));

    if (userGroups.length === 0) {
        return (
            <NoTasksContainer>
                <p>You are not assigned to any groups yet.</p>
            </NoTasksContainer>
        );
    }

    return (
        <Container>
            {userGroups.map((group: TaskGroup) => {
                const tasksInGroup: Task[] =
                    group.tasks
                        .map(taskId => allTasks?.find(t => t._id === taskId))
                        .filter(Boolean) as Task[];

                return (
                    <GroupContainer key={group._id}>
                        <GroupHeader>Group: {group.name}</GroupHeader>

                        {tasksInGroup.length === 0 ? (
                            <p>No tasks in this group.</p>
                        ) : (
                            <TasksGrid>
                                {tasksInGroup.map((task) => (
                                    <TaskCard key={task._id} {...task} />
                                ))}
                            </TasksGrid>
                        )}
                    </GroupContainer>
                );
            })}
        </Container>
    );
}

export default GroupTasksGrid;
