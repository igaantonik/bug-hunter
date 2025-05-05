import React from 'react';
import styled from 'styled-components';
import PageContainer from '../components/PageContainer';
import ReviewPageHeader from '../components/review/ReviewPageHeader';
import ReviewPageFileSelector from '../components/review/ReviewPageFileSelector';
import ReviewPageCodeEditor from '../components/review/ReviewPageCodeEditor';
import { useReviewPage } from '../hooks/pages/useReviewPage';

const ReviewPageContent = styled.div`
    display: flex;
    flex: 1;
    gap: 10px;
`;

function ReviewPage() {
    const { timerRef, fileSelectorProps, reviewSubmitHandler, selectedFile } =
        useReviewPage();

    return (
        <PageContainer>
            <ReviewPageHeader timerRef={timerRef} />
            <ReviewPageContent>
                <ReviewPageFileSelector {...fileSelectorProps} />
                {selectedFile && <ReviewPageCodeEditor file={selectedFile} />}
            </ReviewPageContent>
        </PageContainer>
    );
}
export default ReviewPage;
