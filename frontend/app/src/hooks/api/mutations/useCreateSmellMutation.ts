import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Smell } from '../../../types';
import axiosInstance from '../../../query/axiosInstance';
import { SMELLS_QUERY_KEY } from '../queries/useSmellsQuery';

export const useCreateSmellMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updateData: Smell): Promise<Smell> => {
            const response = await axiosInstance.post<Smell>(
                '/smells/',
                updateData
            );
            return response.data;
        },
        onSuccess: async () => {
            console.log('Successfully created a new smell type!');
            await queryClient.invalidateQueries({
                queryKey: [SMELLS_QUERY_KEY],
            });
        },
        onError: (error) => {
            console.error('Creating smell type failed:', error.message);
        },
    });
};
