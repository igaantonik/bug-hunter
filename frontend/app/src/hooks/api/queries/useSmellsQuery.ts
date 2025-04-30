import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../axiosInstance';
import { Smell, SmellWithColor } from '../../../types';
import { generatePastelRGBColor } from '../../../util/generatePastelRGBColor';

export const SMELLS_QUERY_KEY = 'smells';

export const useSmellsQuery = () =>
    useQuery<SmellWithColor[]>({
        queryKey: [SMELLS_QUERY_KEY],
        queryFn: async () =>
            axiosInstance
                .get<{ smells: Smell[] }>('/smells/')
                .then((response) =>
                    response.data?.smells.map((smell) => ({
                        ...smell,
                        color: generatePastelRGBColor(),
                    }))
                ),
    });
