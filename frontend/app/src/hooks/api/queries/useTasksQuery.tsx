import { useSuspenseQuery } from '@tanstack/react-query';
import axiosInstance from '../../../query/axiosInstance';
import { Task } from '../../../types';

export const TASKS_QUERY_KEY = 'tasks';

export const useTasksQuery = () =>
    useSuspenseQuery<Task[]>({
        queryKey: [TASKS_QUERY_KEY],
        queryFn: async () =>
            axiosInstance
                .get<{ tasks: Task[] }>('/tasks/')
                .then((response) => response.data?.tasks),
    });
