import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { PropsWithChildren, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import SuspenseWrapper from './SuspenseWrapper';

function Wrapper({ children }: PropsWithChildren) {
    const queryClient = new QueryClient();

    return (
        <StrictMode>
            <SuspenseWrapper>
                <ErrorBoundary>
                    <BrowserRouter>
                        <QueryClientProvider client={queryClient}>
                            {children}
                        </QueryClientProvider>
                    </BrowserRouter>
                </ErrorBoundary>
            </SuspenseWrapper>
        </StrictMode>
    );
}

export default Wrapper;
