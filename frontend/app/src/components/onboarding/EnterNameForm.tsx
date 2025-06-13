import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import useUserStore from '../../store/useUserStore';

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ced4da;
    font-size: 1rem;
    font-family: 'Inter', sans-serif;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #ca0013;
        box-shadow: 0 0 0 2px rgba(202, 0, 19, 0.2);
    }
`;

const ErrorText = styled.p`
    color: #ca0013;
    font-size: 0.875rem;
    margin: 0;
    min-height: 1em;
`;

const SubmitButton = styled.button`
    padding: 12px;
    background-color: #ca0013;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    font-family: 'Paytone One', sans-serif;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #a00010;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

function EnterNameForm() {
    const [value, setValue] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { setUsername, setIsOnboarded } = useUserStore();

    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (value.trim() === '') {
            setError('Nickname cannot be empty!');
            return;
        }
        setError(null);
        setUsername(value.trim());
        setIsOnboarded(true);
    };

    return (
        <Form onSubmit={formSubmitHandler}>
            <Input
                type="text"
                placeholder="Your nickname"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <SubmitButton type="submit">Proceed</SubmitButton>
            <ErrorText>{error}</ErrorText>
        </Form>
    );
}

export default EnterNameForm;
