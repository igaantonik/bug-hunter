import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { PropsWithChildren, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';

function Wrapper({ children }: PropsWithChildren) {
    const queryClient = new QueryClient();

    return (
        <StrictMode>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </BrowserRouter>
        </StrictMode>
    );
}

export default Wrapper;
