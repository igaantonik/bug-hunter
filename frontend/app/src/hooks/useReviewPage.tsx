import { useState } from 'react';
import { useTasksQuery } from './queries/useTasksQuery';
import useURLQuery from './useURLQuery';
import { useReviewPageTimer } from './useReviewPageTimer';
import { useSmellsQuery } from './queries/useSmellsQuery';
import { useCreateReviewMutation } from './mutations/useCreateReviewMutation';
import { File } from '../types';

interface UseReviewPageResult {
    files: File[];
    selectedFileId: string;
    currentTimeFormattedSeconds: string;
    filesListItemClickHandler: (fileId: string) => void;
    reviewSubmitHandler: () => Promise<void>;
    selectedFile: File | undefined;
}

export const useReviewPage = (): UseReviewPageResult => {
    const query = useURLQuery();
    const taskId = query.get('taskId');

    const { data: tasks } = useTasksQuery();
    const currentTaskData = tasks.find((task) => task._id === taskId);

    const [selectedFileId, setSelectedFileId] = useState(
        currentTaskData?.files[0]?._id ?? ''
    );

    const selectedFile: File | undefined = currentTaskData?.files.find(
        (file) => file._id === selectedFileId
    );

    const { currentTimeSeconds, currentTimeFormattedSeconds } =
        useReviewPageTimer();

    const { mutateAsync: createNewReview } = useCreateReviewMutation();

    const reviewSubmitHandler = async () => {
        await createNewReview({
            reviewed_smells: [],
            task_id: taskId ?? '',
        });
    };

    const filesListItemClickHandler = (fileId: string) => {
        console.log('SETTING SELECTED ID TO', fileId);
        setSelectedFileId(fileId);
    };

    return {
        currentTimeFormattedSeconds,
        selectedFileId,
        files: currentTaskData?.files ?? [],
        filesListItemClickHandler,
        reviewSubmitHandler,
        selectedFile,
    };
};
