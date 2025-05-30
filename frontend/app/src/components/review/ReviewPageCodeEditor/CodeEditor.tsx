import React, { useCallback } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import useReviewStore from '../../../store/useReviewStore';
import { useSmellsQuery } from '../../../hooks/api/queries/useSmellsQuery';

interface CodeEditorProps {
    lines: Record<string, string>;
    handleMouseOverLine: (event: React.MouseEvent, lineNumber: number) => void;
    fileId: string | undefined;
}

function CodeEditor({ lines, handleMouseOverLine, fileId }: CodeEditorProps) {
    const { currentSelection, selectedSmells } = useReviewStore();
    const { data: smells } = useSmellsQuery();

    const getLineBackgroundColor = useCallback(
        (lineNumber: number) => {
            if (
                currentSelection[0] &&
                currentSelection[1] &&
                lineNumber >= currentSelection[0] &&
                lineNumber <= currentSelection[1]
            )
                return 'yellow';

            // check if not selected smell
            if (fileId) {
                const selectedFileSmells = selectedSmells[fileId];
                if (selectedFileSmells) {
                    const selectedSmellId =
                        selectedSmells[fileId][lineNumber.toString()];

                    if (selectedSmellId)
                        return smells?.find((s) => s._id === selectedSmellId)
                            ?.color;
                }
            }
            return '';
        },
        [currentSelection, smells, fileId]
    );

    return (
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
                    userSelect: 'none',
                    backgroundColor: getLineBackgroundColor(lineNumber),
                },
                onMouseOver: (event) => handleMouseOverLine(event, lineNumber),
            })}
        >
            {Object.values(lines).join('\n')}
        </SyntaxHighlighter>
    );
}

export default CodeEditor;
