import { Task } from '../../../types';
import { Button, ItemList, ListItem } from '../AdminStyled';

interface TaskListProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    deletingTaskId?: string | null;
    isDeletePending: boolean;
}

function TaskList({
    tasks,
    onEdit,
    onDelete,
    deletingTaskId,
    isDeletePending,
}: TaskListProps) {
    if (tasks.length === 0) {
        return <p>No tasks defined yet.</p>;
    }

    return (
        <ItemList>
            {tasks.map((task) => (
                <ListItem key={task._id}>
                    <div>
                        <strong>Name: {task.name}</strong>
                        <p>
                            Description:{' '}
                            {task.description.length > 100
                                ? `${task.description.substring(0, 100)}...`
                                : task.description}
                        </p>
                        <small style={{ color: '#777' }}>
                            Files: {task.files.length} | Time:{' '}
                            {task.allowed_time !== null
                                ? `${task.allowed_time} seconds`
                                : 'Not set'}
                        </small>
                    </div>
                    <div>
                        <Button variant="edit" onClick={() => onEdit(task)}>
                            Edit
                        </Button>
                        &nbsp;
                        <Button
                            variant="delete"
                            onClick={() => onDelete(task._id!)}
                            disabled={
                                isDeletePending && deletingTaskId === task._id
                            }
                        >
                            {isDeletePending && deletingTaskId === task._id
                                ? 'Deleting...'
                                : 'Delete'}
                        </Button>
                    </div>
                </ListItem>
            ))}
        </ItemList>
    );
}

export default TaskList;
