import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axiosInstance';
import { Task } from '../types';

const TASKS_QUERY_KEY = 'tasks';

export const useTasksQuery = () =>
    useQuery<Task[]>({
        queryKey: [TASKS_QUERY_KEY],
        queryFn: async () => {
            console.log('TEETTE');
            return axiosInstance.get<Task[]>('/tasks/').then((response) => {
                console.log(response);
                return [];
            });
        },
    });
