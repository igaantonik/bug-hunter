import { QueryClientProvider } from '@tanstack/react-query';
import React, { PropsWithChildren, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SuspenseWithErrorBoundary from './SuspenseWithErrorBoundary';
import queryClient from '../query/queryClient';

function Wrapper({ children }: PropsWithChildren) {
    return (
        <StrictMode>
            <BrowserRouter>
                <SuspenseWithErrorBoundary>
                    <QueryClientProvider client={queryClient}>
                        {children}
                    </QueryClientProvider>
                </SuspenseWithErrorBoundary>
            </BrowserRouter>
        </StrictMode>
    );
}

export default Wrapper;
