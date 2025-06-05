import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../../query/axiosInstance';
import { FILES_QUERY_KEY } from '../queries/useFilesQuery';

export const useDeleteFileMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (fileId: string) => {
            await axiosInstance.delete(`/files/${fileId}/`);
        },
        onSuccess: async (_, fileId) => {
            console.log('Successfully deleted file:', fileId);
            await queryClient.invalidateQueries({
                queryKey: [FILES_QUERY_KEY],
            });
        },
        onError: (error) => {
            console.error('Deleting file failed:', error.message);
        },
    });
};
