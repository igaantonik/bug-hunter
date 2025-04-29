import { useSuspenseQuery } from '@tanstack/react-query';
import axiosInstance from '../../axiosInstance';
import { Task } from '../../types';

const TASKS_QUERY_KEY = 'tasks';

export const useTasksQuery = () =>
    useSuspenseQuery<Task[]>({
        queryKey: [TASKS_QUERY_KEY],
        queryFn: async () =>
            axiosInstance
                .get<{ tasks: Task[] }>('/tasks/')
                .then((response) => response.data?.tasks),
    });
