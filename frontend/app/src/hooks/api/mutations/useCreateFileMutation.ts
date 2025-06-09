import { useMutation, useQueryClient } from '@tanstack/react-query';
import { File, UploadFile } from '../../../types';
import axiosInstance from '../../../query/axiosInstance';
import { FILES_QUERY_KEY } from '../queries/useFilesQuery';

export const useCreateFileMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (formData: FormData): Promise<File> => {
            const response = await axiosInstance.post<File>(
                '/files/',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data;
        },
        onSuccess: async () => {
            console.log('Successfully created a new file!');
            await queryClient.invalidateQueries({
                queryKey: [FILES_QUERY_KEY],
            });
        },
        onError: (error) => {
            console.error('Creating file failed:', error.message);
        },
    });
};
