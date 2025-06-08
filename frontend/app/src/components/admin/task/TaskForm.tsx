import React, { useState, useEffect } from 'react';
import { Task, File as FileType } from '../../../types';
import { FormGroup, FormButtons, Button, CheckboxGroup } from '../AdminStyled';

interface BaseTaskFormProps {
    onCancel: () => void;
    isSaving: boolean;
    allFiles: FileType[];
}

interface AddTaskFormProps extends BaseTaskFormProps {
    mode: 'add';
    initialData: Partial<Task>;
    onSubmit: (urlEncodedData: URLSearchParams) => void;
}

interface EditTaskFormProps extends BaseTaskFormProps {
    mode: 'edit';
    initialData: Task;
    onSubmit: (taskData: Task) => void;
}

type TaskFormProps = AddTaskFormProps | EditTaskFormProps;

function TaskForm(props: TaskFormProps) {
    const { onCancel, isSaving, allFiles, initialData } = props;

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);
    const [allowedTime, setAllowedTime] = useState<string>('');

    useEffect(() => {
        setName(initialData.name || '');
        setDescription(initialData.description || '');
        setSelectedFileIds(initialData.files || []);
        setAllowedTime(
            initialData.allowed_time !== null &&
                initialData.allowed_time !== undefined
                ? String(initialData.allowed_time)
                : ''
        );
    }, [initialData]);

    const handleFileSelectionChange = (fileId: string) => {
        setSelectedFileIds((prevSelected) =>
            prevSelected.includes(fileId)
                ? prevSelected.filter((id) => id !== fileId)
                : [...prevSelected, fileId]
        );
    };

    const handleFormInternalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name.trim()) {
            alert('Task name is required.');
            return;
        }

        const timeNum =
            allowedTime.trim() === '' ? null : parseInt(allowedTime, 10);
        if (allowedTime.trim() !== '' && (isNaN(timeNum!) || timeNum! < 0)) {
            alert('Allowed time must be a valid positive number or empty.');
            return;
        }

        if (props.mode === 'add') {
            const params = new URLSearchParams();
            params.append('name', name.trim());
            params.append('description', description.trim());
            params.append('files', selectedFileIds.join(','));

            if (timeNum !== null) {
                params.append('allowed_time', String(timeNum));
            }
            props.onSubmit(params);
        } else if (props.mode === 'edit') {
            const taskDataForUpdate: Task = {
                _id: props.initialData._id,
                name: name.trim(),
                description: description.trim(),
                files: selectedFileIds,
                allowed_time: timeNum,
            };
            props.onSubmit(taskDataForUpdate);
        }
    };

    const isEditMode = !!initialData._id;

    return (
        <form onSubmit={handleFormInternalSubmit}>
            <h2>
                {isEditMode ? `Edit Task: ${initialData.name}` : 'Add New Task'}
            </h2>
            <FormGroup>
                <label htmlFor="taskName">Task Name:</label>
                <input
                    type="text"
                    id="taskName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Refactor User Service"
                    autoFocus
                    disabled={isSaving}
                    required
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="taskDescription">Description:</label>
                <textarea
                    id="taskDescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Detailed description of the task..."
                    rows={4}
                    disabled={isSaving}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="allowedTime">
                    Allowed Time (seconds):
                </label>
                <input
                    type="number"
                    id="allowedTime"
                    value={allowedTime}
                    onChange={(e) => setAllowedTime(e.target.value)}
                    placeholder="e.g., 240"
                    min="0"
                    disabled={isSaving}
                />
            </FormGroup>

            <FormGroup>
                <label>Select Files for this Task:</label>
                {allFiles.length === 0 && (
                    <p>
                        No files available to select. Please upload files first.
                    </p>
                )}
                <CheckboxGroup>
                    {allFiles.map((file) => (
                        <label key={file._id}>
                            <input
                                type="checkbox"
                                value={file._id}
                                checked={selectedFileIds.includes(file._id!)}
                                onChange={() =>
                                    handleFileSelectionChange(file._id!)
                                }
                                disabled={isSaving}
                            />
                            {file.name}
                        </label>
                    ))}
                </CheckboxGroup>
                {selectedFileIds.length === 0 && (
                    <small style={{ color: 'orange' }}>
                        Warning: No files selected for this task.
                    </small>
                )}
            </FormGroup>

            <FormButtons>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSaving || !name.trim()}
                >
                    {isSaving
                        ? 'Saving...'
                        : isEditMode
                          ? 'Save Changes'
                          : 'Create Task'}
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={isSaving}
                >
                    Cancel
                </Button>
            </FormButtons>
        </form>
    );
}

export default TaskForm;
