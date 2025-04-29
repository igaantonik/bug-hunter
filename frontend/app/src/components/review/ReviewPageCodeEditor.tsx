import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styled from 'styled-components';
import { SMELLS } from '../../data/consts';

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

const PlusButton = styled.button<{ top: number | null }>`
    position: absolute;
    left: 10px;
    top: ${(props) => props.top}px;
    display: ${(props) => (props.top !== null ? 'flex' : 'none')};
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

const ContextMenu = styled.div<{ top: number; left: number }>`
    position: absolute;
    top: ${(props) => props.top}px;
    left: ${(props) => props.left}px;
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

interface ReviewedSmell {
    id: string | null;
    file_id: string;
    line: string;
    smell_id: string;
}

interface ReviewPageCodeEditorProps {
    file: { id: string; name: string; lines: Record<string, string> };
}

function ReviewPageCodeEditor({ file }: ReviewPageCodeEditorProps) {
    const [hoveredLine, setHoveredLine] = React.useState<number | null>(null);
    const [buttonTop, setButtonTop] = React.useState<number | null>(null);
    const [reviewedSmells, setReviewedSmells] = React.useState<ReviewedSmell[]>(
        []
    );
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [menuPosition, setMenuPosition] = React.useState<{
        top: number;
        left: number;
    } | null>(null);
    const [selectedLine, setSelectedLine] = React.useState<number | null>(null);

    const codeWrapperRef = React.useRef<HTMLDivElement>(null);
    const menuRef = React.useRef<HTMLDivElement>(null);

    const handleMouseOverLine = (
        event: React.MouseEvent,
        lineNumber: number
    ) => {
        if (codeWrapperRef.current && !isMenuOpen) {
            const lineElement = event.currentTarget as HTMLElement;
            const topPosition = lineElement.offsetTop;
            setHoveredLine(lineNumber);
            setButtonTop(topPosition);
        }
    };

    const handleMouseLeaveEditor = () => {
        if (!isMenuOpen) {
            setHoveredLine(null);
            setButtonTop(null);
        }
    };

    const handlePlusButtonClick = () => {
        if (hoveredLine && buttonTop !== null) {
            setSelectedLine(hoveredLine);
            setMenuPosition({
                top: buttonTop + 30,
                left: 35,
            });
            setIsMenuOpen(true);
        }
    };

    const handleSmellSelection = (smellId: string | null) => {
        if (selectedLine) {
            console.log(reviewedSmells);
            const existingSmell = reviewedSmells.find(
                (smell) =>
                    smell.file_id === file.id &&
                    smell.line === selectedLine.toString()
            );
            if (existingSmell) {
                setReviewedSmells((prev) =>
                    prev.filter(
                        (smell) =>
                            smell.file_id !== file.id ||
                            smell.line !== selectedLine.toString()
                    )
                );
            }
            if (smellId) {
                setReviewedSmells((prev) => [
                    ...prev,
                    {
                        id: null,
                        file_id: file.id,
                        line: selectedLine.toString(),
                        smell_id: smellId,
                    },
                ]);
            }
            setIsMenuOpen(false);
            setSelectedLine(null);
            setHoveredLine(null);
            setButtonTop(null);
        }
    };

    return (
        <Container>
            <h3>{file.name}</h3>
            <CodeWrapper
                ref={codeWrapperRef}
                onMouseLeave={handleMouseLeaveEditor}
            >
                <PlusButton top={buttonTop} onClick={handlePlusButtonClick}>
                    +
                </PlusButton>

                {isMenuOpen && menuPosition && (
                    <ContextMenu
                        ref={menuRef}
                        top={menuPosition.top}
                        left={menuPosition.left}
                    >
                        {SMELLS.map((smell) => (
                            <MenuItem
                                key={smell.id}
                                onClick={() => handleSmellSelection(smell.id)}
                            >
                                {smell.name}
                            </MenuItem>
                        ))}
                        <MenuItem onClick={() => handleSmellSelection(null)}>
                            (Remove Smell)
                        </MenuItem>
                    </ContextMenu>
                )}

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
                            backgroundColor: 'red',
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
