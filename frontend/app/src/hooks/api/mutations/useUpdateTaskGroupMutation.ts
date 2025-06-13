import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskGroup } from '../../../types';
import axiosInstance from '../../../query/axiosInstance';
import { TASK_GROUPS_QUERY_KEY } from '../queries/useTaskGroupsQuery';

export const useUpdateTaskGroupMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (groupData: TaskGroup): Promise<TaskGroup> => {
            const response = await axiosInstance.put<TaskGroup>(
                `/task_groups/${groupData._id}`,
                groupData
            );
            return response.data;
        },
        onSuccess: async () => {
            console.log('Successfully updated the task group!');
            await queryClient.invalidateQueries({
                queryKey: [TASK_GROUPS_QUERY_KEY],
            });
        },
        onError: (error) => {
            console.error('Updating task group failed:', error.message);
        },
    });
};
