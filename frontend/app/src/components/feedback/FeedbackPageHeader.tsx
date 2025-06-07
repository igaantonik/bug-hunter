import React from 'react';
import styled from 'styled-components';
import ViewToggle from './ViewToggle';

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 16px 50px;
    margin: 10px 0;

    h3 {
        font-size: 28px;
        color: #333;
        margin: 0;
        font-weight: bold;
        letter-spacing: 1px;
    }

    p {
        font-size: 18px;
        color: #666;
    }
`;

const ScoreBox = styled.h2<{ $scorePercentage: number }>`
    color: ${({ $scorePercentage }) => {
        if ($scorePercentage > 0.7) return 'green';
        if ($scorePercentage > 0.5) return 'yellow';
        if ($scorePercentage > 0.3) return 'orange';
        return 'red';
    }};
`;

const HeaderLeftCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 80px;
`;

interface FeedbackPageHeaderProps {
    taskName: string;
    score: number;
    maxScore: number;
    isCorrectVersionShown: boolean;
    setIsCorrectVersionShown: React.Dispatch<React.SetStateAction<boolean>>;
}

function FeedbackPageHeader({
    taskName,
    score,
    maxScore,
    isCorrectVersionShown,
    setIsCorrectVersionShown,
}: FeedbackPageHeaderProps) {
    return (
        <Header>
            <HeaderLeftCell>
                <h3>Task: {taskName}</h3>
                <ViewToggle
                    isCorrectVersionShown={isCorrectVersionShown}
                    setIsCorrectVersionShown={setIsCorrectVersionShown}
                />
            </HeaderLeftCell>
            <ScoreBox $scorePercentage={score / maxScore}>
                {score} / {maxScore}
            </ScoreBox>
        </Header>
    );
}

export default FeedbackPageHeader;
