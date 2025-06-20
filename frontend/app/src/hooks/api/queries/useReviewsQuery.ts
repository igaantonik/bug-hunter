import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../query/axiosInstance';
import { Review } from '../../../types';

export const REVIEWS_QUERY_KEY = 'reviews';

export const useReviewsQuery = () =>
    useQuery<Review[]>({
        queryKey: [REVIEWS_QUERY_KEY],
        queryFn: async () =>
            axiosInstance
                .get<{ reviews: Review[] }>('/reviews?limit=100')
                .then((response) => response.data?.reviews),
    });
