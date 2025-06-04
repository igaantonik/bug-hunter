import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../query/axiosInstance';
import { Smell, SmellWithColor } from '../../../types';
import { SMELLS_COLORS } from '../../../data/consts';

export const SMELLS_QUERY_KEY = 'smells';

export const useSmellsQuery = () =>
    useQuery<SmellWithColor[]>({
        queryKey: [SMELLS_QUERY_KEY],
        queryFn: async () =>
            axiosInstance
                .get<{ smells: Smell[] }>('/smells/')
                .then((response) =>
                    response.data?.smells.map((smell, i) => ({
                        ...smell,
                        color: SMELLS_COLORS[i],
                    }))
                ),
    });
