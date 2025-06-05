import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditFile, File } from '../../../types';
import axiosInstance from '../../../query/axiosInstance';
import { FILES_QUERY_KEY } from '../queries/useFilesQuery';

export const useUpdateFileMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (fileData: { _id: string } & EditFile) => {
            const { _id, ...updatePayload } = fileData;
            if (!_id) throw new Error('File ID is required for update.');
            const response = await axiosInstance.put<File>(
                `/files/${_id}/`,
                updatePayload
            );
            return response.data;
        },
        onSuccess: async () => {
            console.log('Successfully updated file details!');
            await queryClient.invalidateQueries({
                queryKey: [FILES_QUERY_KEY],
            });
        },
        onError: (error) => {
            console.error('Updating file details failed:', error.message);
        },
    });
};
