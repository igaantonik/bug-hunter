import { useState } from 'react';
import { TaskGroup } from '../../../types';

import { useTaskGroupsQuery } from '../../../hooks/api/queries/useTaskGroupsQuery';
import { useCreateTaskGroupMutation } from '../../../hooks/api/mutations/useCreateTaskGroupMutation';
import { useUpdateTaskGroupMutation } from '../../../hooks/api/mutations/useUpdateTaskGroupMutation';
import { useDeleteTaskGroupMutation } from '../../../hooks/api/mutations/useDeleteTaskGroupMutation';

import { Button } from '../AdminStyled';
import TaskGroupForm from './TaskGroupForm';
import TaskGroupList from './TaskGroupList';

const EMPTY_TASK_GROUP_FORM_DATA: Partial<TaskGroup> = {
    name: '',
    access_code: '',
    owner_id: '',
    user_ids: [],
    tasks: [],
};

function TaskGroupsSection() {
    const { data: taskGroups } = useTaskGroupsQuery();

    const [editingGroup, setEditingGroup] = useState<TaskGroup | null>(null);
    const [showAddForm, setShowAddForm] = useState<boolean>(false);

    const createTaskGroupMutation = useCreateTaskGroupMutation();
    const updateTaskGroupMutation = useUpdateTaskGroupMutation();
    const deleteTaskGroupMutation = useDeleteTaskGroupMutation();

    const handleShowAddForm = () => {
        setEditingGroup(null);
        setShowAddForm(true);
    };

    const handleShowEditForm = (group: TaskGroup) => {
        setShowAddForm(false);
        setEditingGroup(group);
    };

    const handleCancelForm = () => {
        setEditingGroup(null);
        setShowAddForm(false);
    };

    const handleCreateTaskGroup = (groupData: TaskGroup) => {
        createTaskGroupMutation.mutate(groupData, {
            onSuccess: () => {
                handleCancelForm();
            },
            onError: (error: Error) => {
                alert(`Error creating group: ${error.message}`);
            },
        });
    };

    const handleUpdateTaskGroup = (groupData: TaskGroup) => {
        updateTaskGroupMutation.mutate(groupData, {
            onSuccess: () => {
                handleCancelForm();
            },
            onError: (error: Error) => {
                alert(`Error updating group: ${error.message}`);
            },
        });
    };

    const handleDeleteTaskGroup = (id: string) => {
        if (window.confirm('Are you sure you want to delete this group?')) {
            deleteTaskGroupMutation.mutate(id, {
                onError: (error: Error) => {
                    alert(`Error deleting group: ${error.message}`);
                },
            });
        }
    };

    const isMutationPending =
        createTaskGroupMutation.isPending ||
        updateTaskGroupMutation.isPending ||
        deleteTaskGroupMutation.isPending;

    if (showAddForm) {
        return (
            <TaskGroupForm
                mode="add"
                initialData={EMPTY_TASK_GROUP_FORM_DATA}
                onSubmit={handleCreateTaskGroup}
                onCancel={handleCancelForm}
                isSaving={isMutationPending}
            />
        );
    }

    if (editingGroup) {
        return (
            <TaskGroupForm
                mode="edit"
                initialData={editingGroup}
                onSubmit={handleUpdateTaskGroup}
                onCancel={handleCancelForm}
                isSaving={isMutationPending}
            />
        );
    }

    return (
        <>
            <Button variant="add" onClick={handleShowAddForm} disabled={isMutationPending}>
                Add New Task Group
            </Button>

            <h4>Existing Task Groups:</h4>
            <TaskGroupList
                taskGroups={taskGroups || []}
                onEdit={handleShowEditForm}
                onDelete={handleDeleteTaskGroup}
                deletingGroupId={deleteTaskGroupMutation.variables}
                isDeletePending={deleteTaskGroupMutation.isPending}
            />
        </>
    );
}

export default TaskGroupsSection;
