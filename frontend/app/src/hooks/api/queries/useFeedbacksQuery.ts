import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../query/axiosInstance';
import { Feedback } from '../../../types';

export const FEEDBACKS_QUERY_KEY = 'feedbacks';

export const useFeedbacksQuery = () =>
    useQuery<Feedback[]>({
        queryKey: [FEEDBACKS_QUERY_KEY],
        queryFn: async () =>
            axiosInstance
                .get<{ feedbacks: Feedback[] }>('/feedbacks?limit=100')
                .then((response) => response.data?.feedbacks),
    });
