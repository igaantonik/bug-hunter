import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../query/axiosInstance';
import { File } from '../../../types';

export const FILES_QUERY_KEY = 'files';

export const useFilesQuery = () =>
    useQuery<File[]>({
        queryKey: [FILES_QUERY_KEY],
        queryFn: async () =>
            axiosInstance
                .get<{ files: File[] }>('/files/')
                .then((response) => response.data?.files),
    });
