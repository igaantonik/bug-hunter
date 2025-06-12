import { Fragment } from 'react';
import styled from 'styled-components';
import { useSmellsQuery } from '../../../hooks/api/queries/useSmellsQuery';

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;

    div {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
`;

function CodeSmellsGallery() {
    const { data: smells } = useSmellsQuery();
    return (
        <Container>
            {smells?.map((smell) => (
                <Fragment key={smell._id}>
                    <div style={{ backgroundColor: smell.color }} />
                    <p>{smell.name}</p>
                </Fragment>
            ))}
        </Container>
    );
}

export default CodeSmellsGallery;
