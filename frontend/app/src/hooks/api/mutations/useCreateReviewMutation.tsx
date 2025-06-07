import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Feedback, Review } from '../../../types';
import axiosInstance from '../../../query/axiosInstance';
import { REVIEWS_QUERY_KEY } from '../queries/useReviewsQuery';

export const useCreateReviewMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updateData: Review): Promise<Feedback> => {
            const response = await axiosInstance.post<Feedback>(
                '/reviews/',
                updateData
            );
            return response.data;
        },
        onSuccess: async () => {
            console.log('Successfully created a new review!');
            await queryClient.invalidateQueries({
                queryKey: [REVIEWS_QUERY_KEY],
            });
        },
        onError: (error) => {
            console.error('Creating review failed:', error.message);
        },
    });
};
