import { useEffect, useState } from 'react';
import { useTasksQuery } from '../api/queries/useTasksQuery';
import useURLQuery from '../useURLQuery';
import { useReviewPageTimer } from './useReviewPageTimer';
import { useCreateReviewMutation } from '../api/mutations/useCreateReviewMutation';
import { File } from '../../types';
import { useFilesQuery } from '../api/queries/useFilesQuery';

interface UseReviewPageResult {
    files: File[];
    selectedFileId?: string;
    currentTimeFormattedSeconds: string;
    filesListItemClickHandler: (fileId?: string) => void;
    reviewSubmitHandler: () => Promise<void>;
    selectedFile: File | undefined;
}

export const useReviewPage = (): UseReviewPageResult => {
    const query = useURLQuery();
    const taskId = query.get('taskId');

    const { data: tasks } = useTasksQuery();
    const { data: allFiles } = useFilesQuery();
    const currentTaskData = tasks.find((task) => task._id === taskId);

    const taskFiles = allFiles?.filter(
        (file) => file._id && currentTaskData?.files.includes(file._id)
    );

    const [selectedFileId, setSelectedFileId] = useState<string | undefined>(
        undefined
    );

    useEffect(() => {
        if (
            taskFiles &&
            taskFiles[0] &&
            taskFiles[0]._id &&
            selectedFileId === undefined
        )
            setSelectedFileId(taskFiles[0]._id);
    }, [taskFiles]);

    const selectedFile: File | undefined = taskFiles?.find(
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

    const filesListItemClickHandler = (fileId?: string) => {
        setSelectedFileId(fileId);
    };

    return {
        currentTimeFormattedSeconds,
        selectedFileId,
        files: taskFiles ?? [],
        filesListItemClickHandler,
        reviewSubmitHandler,
        selectedFile,
    };
};
