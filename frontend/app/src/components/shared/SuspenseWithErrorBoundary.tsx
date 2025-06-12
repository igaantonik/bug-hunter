import { PropsWithChildren, Suspense } from 'react';
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

function SuspenseWithErrorBoundary({ children }: PropsWithChildren) {
    return (
        <ErrorBoundary>
            <Suspense
                fallback={
                    <FallbackContainer>
                        <SyncLoader speedMultiplier={LOADER_SPEED_MULTIPLIER} />
                    </FallbackContainer>
                }
            >
                {children}
            </Suspense>
        </ErrorBoundary>
    );
}

export default SuspenseWithErrorBoundary;
