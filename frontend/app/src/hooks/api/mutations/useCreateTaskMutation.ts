import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task } from '../../../types';
import axiosInstance from '../../../query/axiosInstance';
import { TASKS_QUERY_KEY } from '../queries/useTasksQuery';

export const useCreateTaskMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (urlEncodedData: URLSearchParams): Promise<Task> => {
            const response = await axiosInstance.post<Task>(
                '/tasks/',
                urlEncodedData,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            return response.data;
        },
        onSuccess: async () => {
            console.log('Successfully created a new task!');
            await queryClient.invalidateQueries({
                queryKey: [TASKS_QUERY_KEY],
            });
        },
        onError: (error) => {
            console.error('Creating task failed:', error.message);
        },
    });
};
