import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../../query/axiosInstance';
import { TASK_GROUPS_QUERY_KEY } from '../queries/useTaskGroupsQuery';

interface JoinTaskGroupPayload {
    accessCode: string;
    username: string;
}

export const useJoinTaskGroupMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ accessCode, username }: JoinTaskGroupPayload): Promise<void> => {
            await axiosInstance.post(`/task_groups/join/${accessCode}`, username);
        },
        onSuccess: async () => {
            console.log('Successfully joined task group!');
            await queryClient.invalidateQueries({
                queryKey: [TASK_GROUPS_QUERY_KEY],
            });
        },
        onError: (error) => {
            console.error('Joining task group failed:', error.message);
        },
    });
};
