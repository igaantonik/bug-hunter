import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ViewToggle from './ViewToggle';
import BackIcon from '../../assets/back-btn.png';

const Header = styled.header`
    background-color: #eeebe3;
    margin: 0;
    padding: 0 150px 35px 5px;

    @media (max-width: 768px) {
        padding: 0 40px 25px 40px;
    }
`;

const HeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const LeftGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const BackButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 130px 0 0;

    img {
        width: 36px;
        height: 36px;
        transition: opacity 0.2s ease;
    }

    &:hover img {
        opacity: 0.7;
    }
`;

const TaskTitle = styled.h3`
    font-size: 34px;
    font-family: 'Paytone One', sans-serif;
    color: #333;
    margin: 0;
    font-weight: bold;
    letter-spacing: 1px;
`;

const RightGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-end;
        gap: 16px;
    }
`;

const ScoreBox = styled.h2<{ $scorePercentage: number }>`
    color: ${({ $scorePercentage }) => {
        if ($scorePercentage > 0.7) return 'green';
        if ($scorePercentage > 0.5) return 'orange';
        if ($scorePercentage > 0.3) return 'darkorange';
        return '#ca0013';
    }};
    font-family: 'Gudea', sans-serif;
    font-weight: bold;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 12px;
    height: 36px;
    padding: 0 12px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 5px rgba(202, 0, 19, 0.2);
`;

interface FeedbackPageHeaderProps {
    taskName: string;
    score: number;
    maxScore: number;
    isCorrectVersionShown: boolean;
    setIsCorrectVersionShown: (val: boolean) => void;
}

function FeedbackPageHeader({
    taskName,
    score,
    maxScore,
    isCorrectVersionShown,
    setIsCorrectVersionShown,
}: FeedbackPageHeaderProps) {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <Header>
            <HeaderRow>
                <LeftGroup>
                    <BackButton onClick={handleBackClick} title="Back to home">
                        <img src={BackIcon} alt="Back" />
                    </BackButton>
                    <TaskTitle>Task: {taskName}</TaskTitle>
                </LeftGroup>

                <RightGroup>
                    <ViewToggle
                        isCorrectVersionShown={isCorrectVersionShown}
                        setIsCorrectVersionShown={setIsCorrectVersionShown}
                    />
                    <ScoreBox $scorePercentage={score / maxScore}>
                        Score: {score} / {maxScore}
                    </ScoreBox>
                </RightGroup>
            </HeaderRow>
        </Header>
    );
}

export default FeedbackPageHeader;
