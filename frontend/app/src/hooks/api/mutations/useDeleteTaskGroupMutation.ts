import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../../query/axiosInstance';
import { TASK_GROUPS_QUERY_KEY } from '../queries/useTaskGroupsQuery';

export const useDeleteTaskGroupMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (groupId: string): Promise<void> => {
            await axiosInstance.delete(`/task_groups/${groupId}`);
        },
        onSuccess: async () => {
            console.log('Successfully deleted the task group!');
            await queryClient.invalidateQueries({
                queryKey: [TASK_GROUPS_QUERY_KEY],
            });
        },
        onError: (error) => {
            console.error('Deleting task group failed:', error.message);
        },
    });
};
