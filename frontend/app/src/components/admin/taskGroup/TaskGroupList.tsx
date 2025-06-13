import { TaskGroup } from '../../../types';
import { Button, ItemList, ListItem } from '../AdminStyled';

interface TaskGroupListProps {
    taskGroups: TaskGroup[];
    onEdit: (group: TaskGroup) => void;
    onDelete: (id: string) => void;
    deletingGroupId?: string | null;
    isDeletePending: boolean;
}

function TaskGroupList({
    taskGroups,
    onEdit,
    onDelete,
    deletingGroupId,
    isDeletePending,
}: TaskGroupListProps) {
    if (!taskGroups || taskGroups.length === 0) {
        return <p>No task groups defined yet.</p>;
    }

    return (
        <ItemList>
            {taskGroups.map((group) => (
                console.log(group),
                <ListItem key={group._id ?? Math.random()}>
                    <div>
                        <strong>Group: {group.name}</strong>
                        <p>Access Code: <b>{group.access_code || '---'}</b></p>
                        <small style={{ color: '#777' }}>
                            Users assigned: {group.user_ids?.length ?? 0} | Tasks assigned: {group.tasks?.length ?? 0}
                        </small>
                    </div>
                    <div>
                        <Button variant="edit" onClick={() => onEdit(group)}>
                            Edit
                        </Button>
                        <Button
                            variant="delete"
                            onClick={() => group._id && onDelete(group._id)}
                            disabled={isDeletePending && deletingGroupId === group._id}
                        >
                            {isDeletePending && deletingGroupId === group._id
                                ? 'Deleting...'
                                : 'Delete'}
                        </Button>
                    </div>
                </ListItem>
            ))}
        </ItemList>
    );
}

export default TaskGroupList;
