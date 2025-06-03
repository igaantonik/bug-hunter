import { RefObject, useEffect, useRef, useState } from 'react';
import { useTasksQuery } from '../api/queries/useTasksQuery';
import useURLQuery from '../useURLQuery';
import { useCreateReviewMutation } from '../api/mutations/useCreateReviewMutation';
import { File, SmellRecord } from '../../types';
import { useFilesQuery } from '../api/queries/useFilesQuery';
import useReviewStore from '../../store/useReviewStore.ts';
import useUserStore from '../../store/useUserStore.ts';

interface UseReviewPageResult {
    reviewSubmitHandler: () => Promise<void>;
    timerRef: RefObject<number>;
    selectedFile: File | undefined;

    fileSelectorProps: {
        files: File[];
        selectedFileId?: string;
        onFilesListItemClick: (fileId?: string) => void;
    };
    allowedTime: number;
}

export const useReviewPage = (): UseReviewPageResult => {
    const query = useURLQuery();
    const taskId = query.get('taskId');
    const { username } = useUserStore();
    const { selectedSmells } = useReviewStore();
    const timerRef = useRef(0);

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
    }, [taskFiles, selectedFileId]);

    const selectedFile: File | undefined = taskFiles?.find(
        (file) => file._id === selectedFileId
    );

    const { mutateAsync: createNewReview } = useCreateReviewMutation();

    const reviewSubmitHandler = async () => {
        const reviewdSmells = selectedSmellsToSmellRecords(selectedSmells);
        const feedback = await createNewReview({
            reviewed_smells: reviewdSmells,
            task_id: taskId ?? '',
            username: username ?? '',
            // TODO: Use real time that review took
            time: currentTaskData?.allowed_time
                ? currentTaskData.allowed_time - timerRef.current
                : 0,
        });
        console.log(feedback);
        alert(`Feedback: ${JSON.stringify(feedback, null, 2)}`);
    };

    const filesListItemClickHandler = (fileId?: string) => {
        setSelectedFileId(fileId);
    };

    return {
        selectedFile,
        reviewSubmitHandler,
        timerRef,
        fileSelectorProps: {
            selectedFileId,
            files: taskFiles ?? [],
            onFilesListItemClick: filesListItemClickHandler,
        },
        allowedTime: currentTaskData?.allowed_time ?? 0,
    };
};

const selectedSmellsToSmellRecords = (
    selectedSmells: Record<string, Record<string, string>>
): SmellRecord[] => {
    const smellsIdsToLinesPerFile: Record<
        string,
        Record<string, number[]>
    > = {};

    for (const fileId in selectedSmells) {
        const fileSmells = selectedSmells[fileId];

        for (const line in fileSmells) {
            const smellId = fileSmells[line];

            if (!smellsIdsToLinesPerFile[fileId]) {
                smellsIdsToLinesPerFile[fileId] = {};
            }

            if (!smellsIdsToLinesPerFile[fileId][smellId]) {
                smellsIdsToLinesPerFile[fileId][smellId] = [];
            }

            smellsIdsToLinesPerFile[fileId][smellId].push(parseInt(line, 10));
        }
    }

    const result: SmellRecord[] = [];

    for (const fileId in smellsIdsToLinesPerFile) {
        const smellMap = smellsIdsToLinesPerFile[fileId];
        for (const smellId in smellMap) {
            result.push({
                file_id: fileId,
                smell_id: smellId,
                lines: smellMap[smellId].sort((a, b) => a - b), // opcjonalnie posortuj linie
            });
        }
    }

    return result;
};
