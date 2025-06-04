import React, { RefObject } from 'react';
import styled from 'styled-components';
import { formatTime } from '../../util/formatTime';
import { useReviewPageTimer } from '../../hooks/pages/useReviewPageTimer';

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

const TimerContainer = styled.div``;

interface ReviewPageHeaderProps {
    timerRef: RefObject<number>;
    allowedTime: number | null;
}

function ReviewPageHeader({ timerRef, allowedTime }: ReviewPageHeaderProps) {
    const { currentTimeSeconds } = useReviewPageTimer(allowedTime ?? 0);

    if (timerRef) timerRef.current = currentTimeSeconds;
    return (
        <Header>
            <h3>Task: Basic Python Functions</h3>
            {allowedTime !== null && (
                <TimerContainer>
                    {formatTime(currentTimeSeconds)}
                </TimerContainer>
            )}
        </Header>
    );
}

export default ReviewPageHeader;
