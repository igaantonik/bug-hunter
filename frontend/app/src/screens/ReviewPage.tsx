import React, { useState } from 'react';
import styled from 'styled-components';
import PageContainer from '../components/PageContainer';
import useQuery from '../hooks/useQuery';
import ReviewPageHeader from '../components/review/ReviewPageHeader';
import { useReviewPageTimer } from '../hooks/useReviewPageTimer';
import ReviewPageFileSelector from '../components/review/ReviewPageFileSelector';
import ReviewPageCodeEditor from '../components/review/ReviewPageCodeEditor';
import { MOCK_FILES } from '../data/consts';

const ReviewPageContent = styled.div`
    display: flex;
    flex: 1;
    gap: 10px;
`;

function ReviewPage() {
    const query = useQuery();
    const taskId = query.get('taskId');

    const [selectedFileId, setSelectedFileId] = useState(MOCK_FILES[0].id);

    const { currentTimeSeconds, currentTimeFormattedSeconds } =
        useReviewPageTimer();

    const reviewSubmitHandler = () => {
        console.log(taskId, currentTimeSeconds);
    };

    return (
        <PageContainer>
            <ReviewPageHeader currentTimeString={currentTimeFormattedSeconds} />
            <ReviewPageContent>
                <ReviewPageFileSelector
                    files={MOCK_FILES}
                    selectedFileId={selectedFileId}
                    onFilesListItemClick={(fileId: string) =>
                        setSelectedFileId(fileId)
                    }
                />
                <ReviewPageCodeEditor
                    file={
                        MOCK_FILES.find((file) => file.id === selectedFileId) ??
                        MOCK_FILES[0]
                    }
                />
            </ReviewPageContent>
        </PageContainer>
    );
}

export default ReviewPage;
