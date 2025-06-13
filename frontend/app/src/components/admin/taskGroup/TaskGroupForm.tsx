import { useState, useEffect } from 'react';
import { Task, TaskGroup } from '../../../types';
import { FormGroup, FormButtons, Button } from '../AdminStyled';
import { useTasksQuery } from '../../../hooks/api/queries/useTasksQuery';

interface BaseTaskGroupFormProps {
    onCancel: () => void;
    isSaving: boolean;
}

interface AddTaskGroupFormProps extends BaseTaskGroupFormProps {
    mode: 'add';
    initialData: Partial<TaskGroup>;
    onSubmit: (groupData: TaskGroup) => void;
}

interface EditTaskGroupProps extends BaseTaskGroupFormProps {
    mode: 'edit';
    initialData: TaskGroup;
    onSubmit: (groupData: TaskGroup) => void;
}

type TaskGroupFormProps = AddTaskGroupFormProps | EditTaskGroupProps;

function TaskGroupForm(props: TaskGroupFormProps) {
    const { onCancel, isSaving, initialData } = props;
    const { data: allTasks } = useTasksQuery();

    const [name, setName] = useState<string>('');
    const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);

    useEffect(() => {
        setName(initialData.name || '');
    
        if (allTasks) {
            const selected = (initialData.tasks || []).map(taskId =>
                allTasks.find(task => task._id === taskId)
            ).filter(Boolean) as Task[];
    
            setSelectedTasks(selected);
        }
    }, [initialData, allTasks]);
    

    const handleTaskSelection = (task: Task) => {
        setSelectedTasks((prevSelected) => {
            const exists = prevSelected.find(t => t._id === task._id);
            if (exists) {
                return prevSelected.filter(t => t._id !== task._id);
            } else {
                return [...prevSelected, task];
            }
        });
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name.trim()) {
            alert('Group name is required.');
            return;
        }
        const tasks: string[] = selectedTasks
    .map(t => t._id)
    .filter((id): id is string => id !== undefined);
        const groupData: TaskGroup = {
            ...initialData,
            name: name.trim(),
            access_code: initialData.access_code || '',
            owner_id: initialData.owner_id!,
            user_ids: initialData.user_ids || [],
            tasks
        };
        console.log(groupData)
        props.onSubmit(groupData);
    };

    const isEditMode = !!initialData._id;

    return (
        <form onSubmit={handleFormSubmit}>
            <h2>{isEditMode ? `Edit Group: ${initialData.name}` : 'Add New Group'}</h2>

            <FormGroup>
                <label htmlFor="groupName">Group Name:</label>
                <input
                    type="text"
                    id="groupName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSaving}
                    required
                />
            </FormGroup>

            <FormGroup>
                <label>Select Tasks for this Group:</label>
                {allTasks?.map((task) => (
                    <label key={task._id}>
                        <input
                            type="checkbox"
                            checked={selectedTasks.some(t => t._id === task._id)}
                            onChange={() => handleTaskSelection(task)}
                            disabled={isSaving}
                        />
                        {task.name}
                    </label>
                ))}
            </FormGroup>

            <FormButtons>
                <Button type="submit" variant="primary" disabled={isSaving || !name.trim()}>
                    {isSaving ? 'Saving...' : isEditMode ? 'Save Changes' : 'Create Group'}
                </Button>
                <Button type="button" variant="secondary" onClick={onCancel} disabled={isSaving}>
                    Cancel
                </Button>
            </FormButtons>
        </form>
    );
}

export default TaskGroupForm;
