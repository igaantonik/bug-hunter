import React from 'react';
import styled from 'styled-components';

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

interface ReviewPageHeaderProps {
    currentTimeString: string;
}

function ReviewPageHeader({ currentTimeString }: ReviewPageHeaderProps) {
    return (
        <Header>
            <h3>Task: Basic Python Functions</h3>
            <p>{currentTimeString}</p>
        </Header>
    );
}

export default ReviewPageHeader;
