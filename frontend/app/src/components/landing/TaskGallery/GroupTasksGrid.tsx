import styled from 'styled-components';
import { useTaskGroupsQuery } from '../../../hooks/api/queries/useTaskGroupsQuery';
import { useTasksQuery } from '../../../hooks/api/queries/useTasksQuery';
import { TaskGroup, Task } from '../../../types';
import TaskCard from './TaskCard';
import useUserStore from '../../../store/useUserStore.ts';

const Container = styled.div`
`;

const GroupContainer = styled.div`
    margin-bottom: 40px;
`;

const GroupHeader = styled.h3`
    font-family: 'Paytone One', sans-serif;
    color: black;
    font-size: 24px;
    text-align: center;
`;

const TasksGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(280px, 1fr));
    width: 90%;
    margin: 0 auto;
    gap: 24px;
    padding: 10px;
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
