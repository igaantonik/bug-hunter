import React, { RefObject } from 'react';
import styled from 'styled-components';
import { formatTime } from '../../util/formatTime';
import { useReviewPageTimer } from '../../hooks/pages/review/useReviewPageTimer';
import { useNavigate } from 'react-router-dom';
import BackIcon from '../../assets/back-btn.png';
const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #eeebe3;
    padding: 0 170px 35px 5px;
    margin: 0;

    @media (max-width: 768px) {
        padding: 0 40px 25px 40px;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
    }
`;

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    h3 {
        font-size: 34px;
        font-family: 'Paytone One', sans-serif;
        color: #333;
        margin: 0;
        font-weight: bold;
        letter-spacing: 1px;
    }
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

const TimerContainer = styled.div`
    font-size: 18px;
    font-family: 'Gudea', sans-serif;
    color: #ca0013;
    font-weight: bold;
`;

export interface ReviewPageHeaderProps {
    taskName: string;
    timerRef: RefObject<number>;
    allowedTime: number | null;
}

function ReviewPageHeader({
    taskName,
    timerRef,
    allowedTime,
}: ReviewPageHeaderProps) {
    const navigate = useNavigate();
    const { currentTimeSeconds } = useReviewPageTimer(allowedTime ?? 0);

    if (timerRef) timerRef.current = currentTimeSeconds;

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <Header>
            <TitleRow>
                <BackButton onClick={handleBackClick} title="Back to home">
                    <img src={BackIcon} alt="Back" />
                </BackButton>
                <h3>Task: {taskName}</h3>
            </TitleRow>
            {allowedTime !== null && (
                <TimerContainer>
                    {formatTime(currentTimeSeconds)}
                </TimerContainer>
            )}
        </Header>
    );
}

export default ReviewPageHeader;
