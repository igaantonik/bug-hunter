import { useSuspenseQuery } from '@tanstack/react-query';
import axiosInstance from '../../../query/axiosInstance';
import { TaskGroup } from '../../../types';

export const TASK_GROUPS_QUERY_KEY = 'task_groups';

export const useTaskGroupsQuery = () =>
    useSuspenseQuery<TaskGroup[]>({
        queryKey: [TASK_GROUPS_QUERY_KEY],
        queryFn: async () =>
            axiosInstance
                .get<{ groups: TaskGroup[] }>('/task_groups/')
                .then((response) => response.data?.groups),
    });
