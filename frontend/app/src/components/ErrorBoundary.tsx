import React, { Component } from 'react';
import PageContainer from './PageContainer';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: '' };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        // this.state.error = `${error.name} : ${error.message}`;
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error(`${error.name} : ${error.message}`);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <PageContainer centered>
                    <h1>Something went wrong.</h1>
                    <p>{this.state.error}</p>
                </PageContainer>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
