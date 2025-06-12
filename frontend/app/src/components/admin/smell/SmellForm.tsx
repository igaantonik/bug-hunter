import { useRef } from 'react';
import { Smell } from '../../../types';
import { FormGroup, FormButtons, Button } from '../AdminStyled';

interface SmellFormProps {
    formData: Smell;
    onFormDataChange: (value: string) => void;
    handleSubmit: () => void;
    onCancel: () => void;
    isSaving: boolean;
}

function SmellForm({
    formData,
    onFormDataChange,
    handleSubmit,
    onCancel,
    isSaving,
}: SmellFormProps) {
    const handleFormInternalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit();
    };

    const initialName = useRef<string>(formData.name || '');

    return (
        <form onSubmit={handleFormInternalSubmit}>
            <h2>
                {formData._id
                    ? `Edit Smell: ${initialName.current}`
                    : 'Add New Smell'}
            </h2>
            <FormGroup>
                <label htmlFor="smellName">Smell Name:</label>
                <input
                    type="text"
                    id="smellName"
                    name="smellName"
                    value={formData.name || ''}
                    onChange={(e) => onFormDataChange(e.target.value)}
                    placeholder="e.g., God Class"
                    disabled={isSaving}
                />
            </FormGroup>
            <FormButtons>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSaving || !formData.name?.trim()}
                >
                    {isSaving ? 'Saving...' : 'Save Smell'}
                </Button>
                <Button
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

export default SmellForm;
