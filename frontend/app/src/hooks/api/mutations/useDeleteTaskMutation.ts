import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../../query/axiosInstance';
import { TASKS_QUERY_KEY } from '../queries/useTasksQuery';

export const useDeleteTaskMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (taskId: string) => {
            await axiosInstance.delete(`/tasks/${taskId}/`);
        },
        onSuccess: async (_, taskId) => {
            console.log('Successfully deleted task:', taskId);
            await queryClient.invalidateQueries({
                queryKey: [TASKS_QUERY_KEY],
            });
        },
        onError: (error) => {
            console.error('Deleting task failed:', error.message);
        },
    });
};
