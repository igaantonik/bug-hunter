import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task } from '../../../types';
import axiosInstance from '../../../query/axiosInstance';
import { TASKS_QUERY_KEY } from '../queries/useTasksQuery';

export const useUpdateTaskMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updateData: Task) => {
            const { _id, ...updatePayload } = updateData;
            if (!_id) throw new Error('Task ID is required for update.');
            const response = await axiosInstance.put<Task>(
                `/tasks/${_id}/`,
                updatePayload
            );
            return response.data;
        },
        onSuccess: async () => {
            console.log('Successfully updated task!');
            await queryClient.invalidateQueries({
                queryKey: [TASKS_QUERY_KEY],
            });
        },
        onError: (error) => {
            console.error('Updating task failed:', error.message);
        },
    });
};
