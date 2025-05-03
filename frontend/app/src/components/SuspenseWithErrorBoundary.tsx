import React, { PropsWithChildren } from 'react';
import { SyncLoader } from 'react-spinners';
import styled from 'styled-components';
import ErrorBoundary from './ErrorBoundary';

const LOADER_SPEED_MULTIPLIER = 0.8;

const FallbackContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px;
`;

const SuspenseWithErrorBoundary = ({ children }: PropsWithChildren) => {
    return (
        <ErrorBoundary>
            <React.Suspense
                fallback={
                    <FallbackContainer>
                        <SyncLoader speedMultiplier={LOADER_SPEED_MULTIPLIER} />
                    </FallbackContainer>
                }
            >
                {children}
            </React.Suspense>
        </ErrorBoundary>
    );
};

export default SuspenseWithErrorBoundary;
