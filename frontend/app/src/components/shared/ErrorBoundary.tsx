import React, { Component, ErrorInfo, PropsWithChildren } from 'react';
import { BiError } from 'react-icons/bi';
import styled from 'styled-components';

const ErrorMessageContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
        display: flex;
        gap: 20px;
        margin: 20px;
        background-color: #ffb7b3;
        border: 1px solid red;
        padding: 10px;
    }

    div > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    h1 {
        color: red;
        font-size: 25px;
    }

    p {
        color: red;
        margin: 0;
        font-size: 15px;
    }
`;

interface Props extends PropsWithChildren {}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, _: ErrorInfo) {
        console.error(error.name, error.message);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <ErrorMessageContainer>
                    <div>
                        <div>
                            <BiError color="red" size={50} />
                        </div>
                        <div>
                            <h1>Error occurred!</h1>
                            <p>See more details in console</p>
                        </div>
                    </div>
                </ErrorMessageContainer>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
