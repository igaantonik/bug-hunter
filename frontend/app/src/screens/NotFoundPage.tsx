import React from 'react';
import PageContainer from '../components/shared/PageContainer';

function NotFoundPage() {
    return (
        <PageContainer centered>
            <h1>404 - Unmatched Route Error</h1>
            <p>Page not found :(</p>
        </PageContainer>
    );
}

export default NotFoundPage;
