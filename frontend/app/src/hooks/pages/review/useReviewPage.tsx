import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasksQuery } from '../../api/queries/useTasksQuery';
import useURLQuery from '../../useURLQuery';
import { useCreateReviewMutation } from '../../api/mutations/useCreateReviewMutation';
import { File } from '../../../types';
import { useFilesQuery } from '../../api/queries/useFilesQuery';
import useReviewStore from '../../../store/useReviewStore';
import useUserStore from '../../../store/useUserStore';
import { convertSelectedSmellsToSmellRecords } from '../../../util/convertSelectedSmellsToSmellRecords';
import { useSmellsQuery } from '../../api/queries/useSmellsQuery';
import { ReviewPageHeaderProps } from '../../../components/review/ReviewPageHeader';

interface UseReviewPageResult {
    files: File[];
    reviewPageHeaderProps: ReviewPageHeaderProps;
    reviewSubmitHandler: () => Promise<void>;

    selectedFileId: string | undefined;
    setSelectedFileId: (fileId?: string) => void;
    getLineBackgroundColor: (lineNumber: number) => string;
}

export const useReviewPage = (): UseReviewPageResult => {
    const navigate = useNavigate();
    const query = useURLQuery();
    const taskId = query.get('taskId');

    const { data: tasks } = useTasksQuery();
    const currentTaskData = tasks.find((task) => task._id === taskId);

    const timerRef = useRef(0);

    const { data: allFiles } = useFilesQuery();
    const taskFiles = allFiles?.filter(
        (file) => file._id && currentTaskData?.files.includes(file._id)
    );
    const [selectedFileId, setSelectedFileId] = useState<string | undefined>(
        undefined
    );

    const { data: smells } = useSmellsQuery();
    const { currentSelection, selectedSmells } = useReviewStore();

    const getLineBackgroundColor = useCallback(
        (lineNumber: number) => {
            if (
                currentSelection[0] &&
                currentSelection[1] &&
                lineNumber >= currentSelection[0] &&
                lineNumber <= currentSelection[1]
            )
                return 'yellow';

            // check if not selected smell
            if (selectedFileId) {
                const selectedFileSmells = selectedSmells[selectedFileId];
                if (selectedFileSmells) {
                    const selectedSmellId =
                        selectedSmells[selectedFileId][lineNumber.toString()];

                    if (selectedSmellId)
                        return (
                            smells?.find((s) => s._id === selectedSmellId)
                                ?.color ?? ''
                        );
                }
            }
            return '';
        },
        [currentSelection, smells, selectedFileId, selectedSmells]
    );

    const { mutateAsync: createNewReview } = useCreateReviewMutation();
    const { username } = useUserStore();

    const reviewSubmitHandler = async () => {
        const reviewdSmells =
            convertSelectedSmellsToSmellRecords(selectedSmells);
        const feedback = await createNewReview({
            reviewed_smells: reviewdSmells,
            task_id: taskId ?? '',
            username: username ?? '',
            time: currentTaskData?.allowed_time
                ? currentTaskData.allowed_time - timerRef.current
                : 0,
        });
        navigate(`/feedback?review_id=${feedback.review_id}`);
    };

    return {
        files: taskFiles ?? [],
        reviewPageHeaderProps: {
            taskName: currentTaskData?.name ?? '',
            timerRef,
            allowedTime: currentTaskData?.allowed_time ?? 0,
        },
        reviewSubmitHandler,

        selectedFileId,
        setSelectedFileId,
        getLineBackgroundColor,
    };
};
