import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import useUserStore from '../../store/useUserStore';

const Form = styled.form`
    margin-top: 20px;
    width: 400px;
    display: flex;
    flex-direction: column;

    & > div {
        width: 100%;
        height: 50px;
        display: flex;
    }

    & > div > input[type='text'],
    & > div > input[type='text']:focus {
        border-radius: 10px 0px 0px 10px;
        flex: 1;
        border: 1px solid #808080;
        padding-left: 10px;
        font-size: 20px;
        outline: none;
    }

    & > div > input[type='submit'] {
        border-radius: 0px 10px 10px 0px;
        background-color: rgb(55, 97, 226);
        color: #fff;
        font-weight: bold;
        padding: 0px 20px;
        border: 1px solid #808080;
        border-left-width: 0px;
        cursor: pointer;
    }

    & > p {
        color: red;
        margin-top: 10px;
        font-size: 15px;
        margin-left: 10px;
        height: 20px;
    }
`;

function EnterNameForm() {
    const [value, setValue] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { setUsername, setIsOnboarded } = useUserStore();

    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (value === '') {
            setError('Nickname cannot be empty!');
            return;
        }
        setUsername(value);
        setIsOnboarded(true);
    };

    return (
        <Form onSubmit={formSubmitHandler}>
            <div>
                <input
                    type="text"
                    placeholder="your nickname"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <input type="submit" value="Proceed" />
            </div>
            <p>{error}</p>
        </Form>
    );
}

export default EnterNameForm;
