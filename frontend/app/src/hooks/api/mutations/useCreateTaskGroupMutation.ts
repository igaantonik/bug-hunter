import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskGroup } from '../../../types';
import axiosInstance from '../../../query/axiosInstance';
import { TASK_GROUPS_QUERY_KEY } from '../queries/useTaskGroupsQuery';

export const useCreateTaskGroupMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (groupData: TaskGroup): Promise<TaskGroup> => {
            const response = await axiosInstance.post<TaskGroup>(
                '/task_groups/',
                groupData
            );
            return response.data;
        },
        onSuccess: async () => {
            console.log('Successfully created a new task group!');
            await queryClient.invalidateQueries({
                queryKey: [TASK_GROUPS_QUERY_KEY],
            });
        },
        onError: (error) => {
            console.error('Creating task group failed:', error.message);
        },
    });
};
