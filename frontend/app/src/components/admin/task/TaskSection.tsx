import { useState } from 'react';
import { Task } from '../../../types';

import { useTasksQuery } from '../../../hooks/api/queries/useTasksQuery';
import { useFilesQuery } from '../../../hooks/api/queries/useFilesQuery';

import { useCreateTaskMutation } from '../../../hooks/api/mutations/useCreateTaskMutation';
import { useUpdateTaskMutation } from '../../../hooks/api/mutations/useUpdateTaskMutation';
import { useDeleteTaskMutation } from '../../../hooks/api/mutations/useDeleteTaskMutation';

import { Button } from '../AdminStyled';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const EMPTY_TASK_FORM_DATA: Partial<Task> = {
    name: '',
    description: '',
    files: [],
    allowed_time: null,
};

function TasksSection() {
    const { data: tasks } = useTasksQuery();
    const { data: allFiles } = useFilesQuery();

    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [showAddForm, setShowAddForm] = useState<boolean>(false);

    const createTaskMutation = useCreateTaskMutation();
    const updateTaskMutation = useUpdateTaskMutation();
    const deleteTaskMutation = useDeleteTaskMutation();

    const handleShowAddForm = () => {
        setEditingTask(null);
        setShowAddForm(true);
    };

    const handleShowEditForm = (task: Task) => {
        setShowAddForm(false);
        setEditingTask(task);
    };

    const handleCancelForm = () => {
        setEditingTask(null);
        setShowAddForm(false);
    };

    const handleCreateTask = (urlEncodedData: URLSearchParams) => {
        createTaskMutation.mutate(urlEncodedData, {
            onSuccess: () => {
                handleCancelForm();
            },
            onError: (error: Error) => {
                alert(`Error creating task: ${error.message}`);
                console.error('Create task failed:', error);
            },
        });
    };

    const handleUpdateTask = (taskData: Task) => {
        updateTaskMutation.mutate(taskData, {
            onSuccess: () => {
                handleCancelForm();
            },
            onError: (error: Error) => {
                alert(`Error updating task: ${error.message}`);
                console.error('Update task failed:', error);
            },
        });
    };

    const handleDeleteTask = (id: string) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            deleteTaskMutation.mutate(id, {
                onError: (error: Error) => {
                    alert(`Error deleting task: ${error.message}`);
                },
            });
        }
    };

    const isMutationPending =
        createTaskMutation.isPending ||
        updateTaskMutation.isPending ||
        deleteTaskMutation.isPending;

    if (showAddForm) {
        return (
            <TaskForm
                mode="add"
                initialData={EMPTY_TASK_FORM_DATA}
                allFiles={allFiles || []}
                onSubmit={handleCreateTask} // Passes FormData
                onCancel={handleCancelForm}
                isSaving={isMutationPending}
            />
        );
    }

    if (editingTask) {
        return (
            <TaskForm
                mode="edit"
                initialData={editingTask}
                allFiles={allFiles || []}
                onSubmit={handleUpdateTask} // Passes Task object
                onCancel={handleCancelForm}
                isSaving={isMutationPending}
            />
        );
    }

    return (
        <>
            <Button
                variant="add"
                onClick={handleShowAddForm}
                disabled={isMutationPending}
            >
                Add New Task
            </Button>

            <h4>Existing Tasks:</h4>
            <TaskList
                tasks={tasks || []}
                onEdit={handleShowEditForm}
                onDelete={handleDeleteTask}
                deletingTaskId={deleteTaskMutation.variables}
                isDeletePending={deleteTaskMutation.isPending}
            />
        </>
    );
}

export default TasksSection;
