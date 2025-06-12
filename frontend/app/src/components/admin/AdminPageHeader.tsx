import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
    margin: 0 auto;
    padding-bottom: 20px;
    font-family: 'Paytone One', sans-serif;
`;

function AdminPageHeader() {
    return (
        <Header>
            <h1>Admin Page</h1>
        </Header>
    );
}

export default AdminPageHeader;
