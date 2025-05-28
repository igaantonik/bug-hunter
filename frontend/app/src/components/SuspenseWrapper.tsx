import React, { PropsWithChildren } from 'react';
import { SyncLoader } from 'react-spinners';
import styled from 'styled-components';

const FallbackContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px;
`;

function SuspenseWrapper({ children }: PropsWithChildren) {
    return (
        <React.Suspense
            fallback={
                <FallbackContainer>
                    <SyncLoader speedMultiplier={0.8} />
                </FallbackContainer>
            }
        >
            {children}
        </React.Suspense>
    );
}

export default SuspenseWrapper;
