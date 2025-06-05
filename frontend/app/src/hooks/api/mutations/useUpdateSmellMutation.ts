import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Smell } from '../../../types';
import axiosInstance from '../../../query/axiosInstance';
import { SMELLS_QUERY_KEY } from '../queries/useSmellsQuery';

export const useUpdateSmellMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updateData: Smell) => {
            const { _id, ...updatePayload } = updateData;
            if (!_id) throw new Error('Smell ID is required for update.');
            const response = await axiosInstance.put<Smell>(
                `/smells/${_id}/`,
                updatePayload
            );
            return response.data;
        },
        onSuccess: async () => {
            console.log('Successfully updated smell type!');
            await queryClient.invalidateQueries({
                queryKey: [SMELLS_QUERY_KEY],
            });
        },
        onError: (error) => {
            console.error('Updating smell type failed:', error.message);
        },
    });
};
