/* eslint-disable no-restricted-syntax */
import { useCallback, useState } from 'react';
import PageContainer from '../components/shared/PageContainer';
import { useFeedbacksQuery } from '../hooks/api/queries/useFeedbacksQuery';
import useURLQuery from '../hooks/useURLQuery';
import IDE from '../components/shared/IDE/IDE';
import { useReviewsQuery } from '../hooks/api/queries/useReviewsQuery';
import { useTasksQuery } from '../hooks/api/queries/useTasksQuery';
import { useFilesQuery } from '../hooks/api/queries/useFilesQuery';
import FeedbackPageHeader from '../components/feedback/FeedbackPageHeader';
import { useSmellsQuery } from '../hooks/api/queries/useSmellsQuery';

function FeedbackPage() {
    const { data: feedbacks } = useFeedbacksQuery();
    const urlQuery = useURLQuery();
    const reviewId = urlQuery.get('review_id');
    const currentFeedback = feedbacks?.find(
        (feedback) => feedback.review_id === reviewId
    );

    const { data: reviews } = useReviewsQuery();
    const currentReview = reviews?.find((review) => review._id === reviewId);

    const { data: tasks } = useTasksQuery();
    const currentTask = tasks.find(
        (task) => task._id === currentReview?.task_id
    );

    const { data: allFiles } = useFilesQuery();
    const taskFiles = allFiles?.filter(
        (file) => file._id && currentTask?.files.includes(file._id)
    );

    const [isCorrectVersionShown, setIsCorrectVersionShown] = useState(false);
    const [selectedFileId, setSelectedFileId] = useState<string | undefined>(
        undefined
    );

    const { data: smells } = useSmellsQuery();

    const getLineBackgroundColor = useCallback(
        (lineNumber: number) => {
            // check if not selected smell
            if (selectedFileId) {
                if (isCorrectVersionShown) {
                    const currentFile = taskFiles?.find(
                        (file) => file._id === selectedFileId
                    );
                    const fileSmellRecords = currentFile?.smell_records;

                    for (const record of fileSmellRecords ?? []) {
                        const recordSmellId = record.smell_id;
                        const recordLines = record.lines;

                        if (recordLines.includes(lineNumber))
                            return (
                                smells?.find(
                                    (smell) => smell._id === recordSmellId
                                )?.color ?? ''
                            );
                    }
                } else {
                    const reviewedSmellRecords = currentReview?.reviewed_smells;
                    const currentFileReviewedSmellRecords =
                        reviewedSmellRecords?.filter(
                            (smellRecord) =>
                                smellRecord.file_id === selectedFileId
                        );

                    for (const record of currentFileReviewedSmellRecords ??
                        []) {
                        const recordSmellId = record.smell_id;
                        const recordLines = record.lines;

                        if (recordLines.includes(lineNumber))
                            return (
                                smells?.find(
                                    (smell) => smell._id === recordSmellId
                                )?.color ?? ''
                            );
                    }
                }
            }
            return '';
        },
        [
            smells,
            selectedFileId,
            isCorrectVersionShown,
            taskFiles,
            currentReview?.reviewed_smells,
        ]
    );

    return (
        <PageContainer>
            <FeedbackPageHeader
                taskName={currentTask?.name ?? ''}
                score={currentFeedback?.score ?? 0}
                maxScore={currentFeedback?.max_score ?? 0}
                isCorrectVersionShown={isCorrectVersionShown}
                setIsCorrectVersionShown={setIsCorrectVersionShown}
            />
            <IDE
                files={taskFiles ?? []}
                onFileSelectionChange={setSelectedFileId}
                codeEditorProps={{ getLineBackgroundColor }}
            />
        </PageContainer>
    );
}

export default FeedbackPage;
