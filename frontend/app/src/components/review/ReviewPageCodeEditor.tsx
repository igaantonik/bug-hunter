import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styled from 'styled-components';
import { File, SmellWithColor } from '../../types';
import { useCodeEditor } from '../../hooks/pages/useCodeEditor';
import { useSmellsQuery } from '../../hooks/api/queries/useSmellsQuery';

const Container = styled.div`
    background-color: green;
    flex: 4;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;

    h3 {
        font-size: 35px;
        margin: 0;
    }
`;

const CodeWrapper = styled.div`
    position: relative; /* Potrzebne do pozycjonowania przycisku */
`;

const PlusButton = styled.button<{ $top: number | null }>`
    position: absolute;
    left: 10px;
    top: ${(props) => props.$top}px;
    display: ${(props) => (props.$top !== null ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    margin: 2px;
    color: black;
    border: none;
    border-radius: 20%;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    line-height: 1;
    z-index: 10; /* Upewnij się, że jest nad liniami kodu */
    transition: top 0.05s ease-out; /* Płynniejsze przejście (opcjonalne) */

    &:hover {
        background-color: #a2a2a2;
    }
`;

const ContextMenu = styled.div<{ $top: number | null; $left: number }>`
    position: absolute;
    ${({ $top }) => ($top !== null ? `top: ${$top}px;` : '')}
    left: ${({ $left }) => $left}px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);
    padding: 5px 0;
    z-index: 20;
    min-width: 150px; /* Minimalna szerokość menu */
`;

const MenuItem = styled.div`
    padding: 8px 15px;
    cursor: pointer;
    font-size: 14px;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const CodeSmellsGallery = styled.div`
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

interface ReviewPageCodeEditorProps {
    file: File;
}

function ReviewPageCodeEditor({ file }: ReviewPageCodeEditorProps) {
    const { data: smells } = useSmellsQuery();
    const {
        showContextMenu,
        contextMenuProps,
        handleSmellSelection,
        handleMouseOverLine,
        plusButtonProps,
        codeWrapperProps,
    } = useCodeEditor({ file });
    return (
        <Container>
            <h3>{file?.name}</h3>
            <CodeWrapper {...codeWrapperProps}>
                <PlusButton
                    $top={plusButtonProps.top}
                    onClick={plusButtonProps.onClick}
                >
                    +
                </PlusButton>

                {showContextMenu && (
                    <ContextMenu
                        ref={contextMenuProps.ref}
                        $top={contextMenuProps.top}
                        $left={contextMenuProps.left}
                    >
                        {smells?.map((smell) => (
                            <MenuItem
                                key={smell._id}
                                onClick={() => handleSmellSelection(smell._id)}
                            >
                                {smell.name}
                            </MenuItem>
                        ))}
                        <MenuItem
                            onClick={() => handleSmellSelection(undefined)}
                        >
                            (Remove Smell)
                        </MenuItem>
                    </ContextMenu>
                )}

                <CodeSmellsGallery>
                    {smells?.map((smell) => (
                        <>
                            <div style={{ backgroundColor: smell.color }} />
                            <p>{smell.name}</p>
                        </>
                    ))}
                </CodeSmellsGallery>
                <SyntaxHighlighter
                    showLineNumbers
                    language="javascript"
                    style={vs}
                    customStyle={{
                        backgroundColor: '#f2f2f2',
                        fontSize: 15,
                        borderRadius: 5,
                        lineHeight: 2,
                        padding: '20px 10px',
                    }}
                    wrapLines
                    lineProps={(lineNumber) => ({
                        style: {
                            display: 'block',
                            cursor: 'pointer',
                            marginLeft: '30px',
                            marginRight: '30px',
                        },
                        onMouseOver: (event) =>
                            handleMouseOverLine(event, lineNumber),
                    })}
                >
                    {Object.values(file.lines).join('\n')}
                </SyntaxHighlighter>
            </CodeWrapper>
        </Container>
    );
}

export default ReviewPageCodeEditor;
