import styled from 'styled-components';

const ViewToggleContainer = styled.div`
    border: 1px solid #ccc;
    border-radius: 12px;
    width: 180px;
    height: 36px;
    overflow: hidden;
    display: flex;
    background-color: #eeebe3;
    font-family: 'Gudea', sans-serif;
`;

const ViewToggleCell = styled.div<{ $isActive: boolean }>`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    font-size: 16px;
    font-weight: bold;
    color: ${({ $isActive }) => ($isActive ? '#ca0013' : '#333')};
    background-color: ${({ $isActive }) => ($isActive ? '#fbe7e9' : 'white')};
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: ${({ $isActive }) => ($isActive ? '#fbe7e9' : '#e3dfd8')};
    }
`;

interface ViewToggleProps {
    isCorrectVersionShown: boolean;
    setIsCorrectVersionShown: (val: boolean) => void;
}

function ViewToggle({
    isCorrectVersionShown,
    setIsCorrectVersionShown,
}: ViewToggleProps) {
    return (
        <ViewToggleContainer>
            <ViewToggleCell
                $isActive={!isCorrectVersionShown}
                onClick={() => setIsCorrectVersionShown(false)}
            >
                original
            </ViewToggleCell>
            <ViewToggleCell
                $isActive={isCorrectVersionShown}
                onClick={() => setIsCorrectVersionShown(true)}
            >
                correct
            </ViewToggleCell>
        </ViewToggleContainer>
    );
}

export default ViewToggle;
