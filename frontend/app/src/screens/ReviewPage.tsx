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
    const {
        currentTimeFormattedSeconds,
        selectedFileId,
        files,
        filesListItemClickHandler,
        reviewSubmitHandler,
        selectedFile,
    } = useReviewPage();

    return (
        <PageContainer>
            <ReviewPageHeader currentTimeString={currentTimeFormattedSeconds} />
            <ReviewPageContent>
                <ReviewPageFileSelector
                    files={files}
                    selectedFileId={selectedFileId}
                    onFilesListItemClick={filesListItemClickHandler}
                />
                {selectedFile && <ReviewPageCodeEditor file={selectedFile} />}
            </ReviewPageContent>
        </PageContainer>
    );
}
export default ReviewPage;
