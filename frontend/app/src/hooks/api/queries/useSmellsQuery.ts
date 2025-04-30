import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../axiosInstance';
import { Smell } from '../../../types';

export const SMELLS_QUERY_KEY = 'smells';

export const useSmellsQuery = () =>
    useQuery<Smell[]>({
        queryKey: [SMELLS_QUERY_KEY],
        queryFn: async () =>
            axiosInstance
                .get<{ smells: Smell[] }>('/smells/')
                .then((response) => response.data?.smells),
    });
