import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../../query/axiosInstance';
import { SMELLS_QUERY_KEY } from '../queries/useSmellsQuery';
import { FILES_QUERY_KEY } from '../queries/useFilesQuery';

export const useDeleteSmellMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (smellId: string) => {
            await axiosInstance.delete(`/smells/${smellId}/`);
        },
        onSuccess: async (_, smellId) => {
            console.log('Successfully deleted smell type:', smellId);
            await queryClient.invalidateQueries({
                queryKey: [SMELLS_QUERY_KEY],
            });
            await queryClient.invalidateQueries({
                queryKey: [FILES_QUERY_KEY],
            });
        },
        onError: (error) => {
            console.error('Deleting smell type failed:', error.message);
        },
    });
};
