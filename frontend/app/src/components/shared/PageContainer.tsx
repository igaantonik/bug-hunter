import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ $centered?: boolean }>`
    flex: 1;
    background-color: rgb(243, 244, 246);
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    ${(props) =>
        props.$centered
            ? `
        justify-content: center;
        align-items: center;
    `
            : ''}
`;

interface PageContainerProps extends PropsWithChildren {
    centered?: boolean;
}

function PageContainer({ children, centered = false }: PageContainerProps) {
    return <Container $centered={centered}>{children}</Container>;
}

export default PageContainer;
