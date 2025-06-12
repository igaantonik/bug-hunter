import { useState } from 'react';
import { File, EditFile } from '../../../types';

import { useFilesQuery } from '../../../hooks/api/queries/useFilesQuery';
import { useSmellsQuery } from '../../../hooks/api/queries/useSmellsQuery';
import { useCreateFileMutation } from '../../../hooks/api/mutations/useCreateFileMutation';
import { useUpdateFileMutation } from '../../../hooks/api/mutations/useUpdateFileMutation';
import { useDeleteFileMutation } from '../../../hooks/api/mutations/useDeleteFileMutation';

import { Button } from '../AdminStyled';
import FileForm from './FileForm';
import FileList from './FileList';

function FilesSection() {
    const { data: files } = useFilesQuery();
    const { data: smells } = useSmellsQuery();

    const [formData, setFormData] = useState<File | null>(null);
    const [showAddForm, setShowAddForm] = useState<boolean>(false);

    const createFileMutation = useCreateFileMutation();
    const updateFileMutation = useUpdateFileMutation();
    const deleteFileMutation = useDeleteFileMutation();

    const handleShowAddForm = () => {
        setFormData(null);
        setShowAddForm(true);
    };

    const handleShowEditForm = (file: File) => {
        setShowAddForm(false);
        setFormData(file);
    };

    const handleCancelForm = () => {
        setFormData(null);
        setShowAddForm(false);
    };

    const handleCreateFile = (fd: FormData) => {
        createFileMutation.mutate(fd, {
            onSuccess: () => {
                handleCancelForm();
            },
            onError: (error: Error) => {
                alert(`Error creating file: ${error.message}`);
            },
        });
    };

    const handleUpdateFile = (fileData: { _id: string } & EditFile) => {
        if (!formData) return;

        updateFileMutation.mutate(fileData, {
            onSuccess: () => {
                handleCancelForm();
            },
            onError: (error: Error) => {
                alert(`Error updating file: ${error.message}`);
            },
        });
    };

    const handleDeleteFile = (id: string) => {
        if (window.confirm('Are you sure you want to delete this file?')) {
            deleteFileMutation.mutate(id, {
                onError: (error: Error) => {
                    alert(`Error deleting file: ${error.message}`);
                },
            });
        }
    };

    const isSaving =
        createFileMutation.isPending ||
        updateFileMutation.isPending ||
        deleteFileMutation.isPending;

    if (showAddForm) {
        return (
            <FileForm
                key="add-new-file"
                mode="add"
                onSubmit={handleCreateFile}
                onCancel={handleCancelForm}
                isSaving={isSaving}
                smells={smells || []}
            />
        );
    }
    if (formData) {
        return (
            <FileForm
                key={formData._id}
                mode="edit"
                initialFileData={formData}
                onSubmit={handleUpdateFile}
                onCancel={handleCancelForm}
                isSaving={isSaving}
                smells={smells || []}
            />
        );
    }

    return (
        <>
            <Button
                variant="add"
                onClick={handleShowAddForm}
                disabled={isSaving}
            >
                Add New File
            </Button>

            <h4>Existing Files:</h4>
            <FileList
                files={files || []}
                onEdit={handleShowEditForm}
                onDelete={handleDeleteFile}
                deletingFileId={deleteFileMutation.variables}
                isDeletePending={deleteFileMutation.isPending}
            />
        </>
    );
}

export default FilesSection;
