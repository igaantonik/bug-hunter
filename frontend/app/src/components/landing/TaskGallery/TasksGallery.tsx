import styled from 'styled-components';
import TasksGrid from './TasksGrid';
import GroupTasksGrid from './GroupTasksGrid';
import SuspenseWithErrorBoundary from '../../shared/SuspenseWithErrorBoundary';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 30px;

    h2 {
        font-family: 'Paytone One', sans-serif;
        text-align: center;
        font-size: 28px;
        margin-bottom: 24px;
        color: #ca0013;
    }
`;

function TasksGallery() {
    return (
        <Container>
            <h2>Available Tasks</h2>
            <SuspenseWithErrorBoundary>
                <TasksGrid />
            </SuspenseWithErrorBoundary>

            <h2>Available Group Tasks</h2>
            <SuspenseWithErrorBoundary>
                <GroupTasksGrid />
            </SuspenseWithErrorBoundary>
        </Container>
    );
}

export default TasksGallery;
