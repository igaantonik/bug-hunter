import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Task } from '../../../types';
import DebugIcon from '../../../assets/debug-icon.png'; // dostosuj ścieżkę

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(202, 0, 19, 0.08);
  border: 2px solid rgba(202, 0, 19, 0.2);
  border-radius: 12px;
  padding: 24px;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #fef2f2;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70%;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #ca0013;
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  p {
    font-size: 14px;
    color: #444;
    margin: 8px 0 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const StartButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #ca0013;
  font-weight: 600;
  border: none;
  background-color: transparent;
  font-size: 14px;
  cursor: pointer;

  img {
    width: 28px;
    height: 28px;
  }

  &:hover {
    color: #a00010;
  }
`;

type TaskCardProps = Pick<Task, '_id' | 'name' | 'description'>;

function TaskCard({ _id, name, description }: TaskCardProps) {
  const navigate = useNavigate();

  const taskCardClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/review?taskId=${_id}`);
  };

  return (
    <Card onClick={taskCardClickHandler}>
      <InfoWrapper>
        <h3>{name}</h3>
        <p>{description}</p>
      </InfoWrapper>
      <StartButton >
        <img src={DebugIcon} alt="debug icon" />
        Debug
      </StartButton>
    </Card>
  );
}

export default TaskCard;
