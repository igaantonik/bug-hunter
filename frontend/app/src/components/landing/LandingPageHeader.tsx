import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
    width: calc(80% - 20px);
    margin: 0 auto;
`;

function LandingPageHeader() {
    return (
        <Header>
            <h1>Sharpen Your Code Review Skills!</h1>
            <p>
                Practise your code review abilities by identifying hidden bugs
                in pre-selected code snippets. Get instant feedback and track
                your progress.
            </p>
        </Header>
    );
}

export default LandingPageHeader;
