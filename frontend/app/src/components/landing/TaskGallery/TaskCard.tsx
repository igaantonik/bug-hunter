import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Task } from '../../../types';

const Card = styled.div`
    background-color: white;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    min-width: 0;

    h3,
    p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    h3 {
        font-size: 16px;
        font-weight: bold;
        margin: 0;
    }

    p {
        font-size: 14px;
        color: #666;
        margin: 10px 0 0;
    }
`;

type TaskCardProps = Pick<Task, '_id' | 'name' | 'description'>;

function TaskCard({ _id, name, description }: TaskCardProps) {
    const navigate = useNavigate();

    const taskCardClickHandler = () => {
        navigate(`/review?taskId=${_id}`);
    };

    return (
        <Card onClick={taskCardClickHandler}>
            <h3>{name}</h3>
            <p>{description}</p>
        </Card>
    );
}

export default TaskCard;
