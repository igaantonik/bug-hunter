import { Smell } from '../../../types';
import { Button, ItemList, ListItem } from '../AdminStyled';

interface SmellListProps {
    smells: Smell[];
    onEdit: (smell: Smell) => void;
    onDelete: (id: string) => void;
    deletingSmellId: string | null | undefined;
    isDeletePending: boolean;
}

function SmellList({
    smells,
    onEdit,
    onDelete,
    deletingSmellId,
    isDeletePending,
}: SmellListProps) {
    if (smells.length === 0) {
        return <p>No smells defined yet.</p>;
    }

    return (
        <ItemList>
            {smells.map((smell) => (
                <ListItem key={smell._id}>
                    <span>{smell.name}</span>
                    <div>
                        <Button variant="edit" onClick={() => onEdit(smell)}>
                            Edit
                        </Button>
                        <Button
                            variant="delete"
                            onClick={() => onDelete(smell._id!)}
                            disabled={
                                isDeletePending && deletingSmellId === smell._id
                            }
                        >
                            {isDeletePending && deletingSmellId === smell._id
                                ? 'Deleting...'
                                : 'Delete'}
                        </Button>
                    </div>
                </ListItem>
            ))}
        </ItemList>
    );
}

export default SmellList;
