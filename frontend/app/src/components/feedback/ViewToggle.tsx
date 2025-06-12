import styled from 'styled-components';

const ViewToggleContainer = styled.div`
    border: 1px solid black;
    border-radius: 10px;
    width: 200px;
    aspect-ratio: 5/1;
    overflow: hidden;
    display: flex;
`;

const ViewToggleCell = styled.div<{ $isActive: boolean }>`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;

    background-color: ${({ $isActive }) => ($isActive ? '#dbeafe' : '')};
    transition: 0.2s ease-in-out;
`;

interface ViewToggleProps {
    isCorrectVersionShown: boolean;
    setIsCorrectVersionShown: React.Dispatch<React.SetStateAction<boolean>>;
}

function ViewToggle({
    isCorrectVersionShown,
    setIsCorrectVersionShown,
}: ViewToggleProps) {
    return (
        <ViewToggleContainer
            onClick={() => {
                setIsCorrectVersionShown((prev) => !prev);
            }}
        >
            <ViewToggleCell $isActive={!isCorrectVersionShown}>
                original
            </ViewToggleCell>
            <ViewToggleCell $isActive={isCorrectVersionShown}>
                correct
            </ViewToggleCell>
        </ViewToggleContainer>
    );
}

export default ViewToggle;
