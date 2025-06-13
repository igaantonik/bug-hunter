import { File } from '../../../types';
import { Button, ItemList, ListItem } from '../AdminStyled';

interface FileListProps {
    files: File[];
    onEdit: (file: File) => void;
    onDelete: (id: string) => void;
    deletingFileId?: string | null;
    isDeletePending: boolean;
}

function FileList({
    files,
    onEdit,
    onDelete,
    deletingFileId,
    isDeletePending,
}: FileListProps) {
    if (files.length === 0) {
        return <p>No files uploaded yet.</p>;
    }

    return (
        <ItemList>
            {files.map((file) => (
                <ListItem key={file._id}>
                    <span>{file.name}</span>
                    <div>
                        <Button variant="edit" onClick={() => onEdit(file)}>
                            Edit
                        </Button>
                        &nbsp;
                        <Button
                            variant="delete"
                            onClick={() => onDelete(file._id!)}
                            disabled={
                                isDeletePending && deletingFileId === file._id
                            }
                        >
                            {isDeletePending && deletingFileId === file._id
                                ? 'Deleting...'
                                : 'Delete'}
                        </Button>
                    </div>
                </ListItem>
            ))}
        </ItemList>
    );
}

export default FileList;
