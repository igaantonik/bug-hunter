import { useState } from 'react';
import { Smell } from '../../../types';

import { useSmellsQuery } from '../../../hooks/api/queries/useSmellsQuery';
import { useCreateSmellMutation } from '../../../hooks/api/mutations/useCreateSmellMutation';
import { useUpdateSmellMutation } from '../../../hooks/api/mutations/useUpdateSmellMutation';
import { useDeleteSmellMutation } from '../../../hooks/api/mutations/useDeleteSmellMutation';

import { Button } from '../AdminStyled';
import SmellForm from './SmellForm';
import SmellList from './SmellList';

function SmellsSection() {
    const { data: smells } = useSmellsQuery();

    const [formData, setFormData] = useState<Smell | null>(null);

    const createSmellMutation = useCreateSmellMutation();
    const updateSmellMutation = useUpdateSmellMutation();
    const deleteSmellMutation = useDeleteSmellMutation();

    const handleShowAddForm = () => {
        setFormData({ name: '' });
    };

    const handleShowEditForm = (smell: Smell) => {
        setFormData(smell);
    };

    const handleCancelEdit = () => {
        setFormData(null);
    };

    const handleFormDataChange = (value: string) => {
        if (formData) {
            setFormData({ ...formData, name: value });
        }
    };

    const handleSaveSmell = () => {
        if (!formData || !formData.name.trim()) {
            return;
        }

        const mutationOptions = {
            onSuccess: () => {
                handleCancelEdit();
            },
            onError: (error: Error) => {
                console.error('Save failed:', error.message);
            },
        };

        if (formData._id) {
            updateSmellMutation.mutate(formData, mutationOptions);
        } else {
            createSmellMutation.mutate(formData, mutationOptions);
        }
    };

    const handleDeleteSmell = (id: string) => {
        if (window.confirm('Are you sure you want to delete this smell?')) {
            deleteSmellMutation.mutate(id, {
                onError: (error: Error) => {
                    alert(`Error deleting smell: ${error.message}`);
                },
            });
        }
    };

    const isSaving =
        createSmellMutation.isPending || updateSmellMutation.isPending;

    if (formData) {
        return (
            <SmellForm
                formData={formData}
                onFormDataChange={handleFormDataChange}
                handleSubmit={handleSaveSmell}
                onCancel={handleCancelEdit}
                isSaving={isSaving}
            />
        );
    }

    return (
        <>
            <Button variant="add" onClick={handleShowAddForm}>
                Add New Smell
            </Button>

            <h4>Existing Smells:</h4>
            <SmellList
                smells={smells || []}
                onEdit={handleShowEditForm}
                onDelete={handleDeleteSmell}
                deletingSmellId={deleteSmellMutation.variables}
                isDeletePending={deleteSmellMutation.isPending}
            />
        </>
    );
}

export default SmellsSection;
