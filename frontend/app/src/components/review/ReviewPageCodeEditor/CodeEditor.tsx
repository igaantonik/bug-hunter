import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeEditorProps {
    lines: Record<string, string>;
    handleMouseOverLine: (event: React.MouseEvent, lineNumber: number) => void;
}

function CodeEditor({ lines, handleMouseOverLine }: CodeEditorProps) {
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
                },
                onMouseOver: (event) => handleMouseOverLine(event, lineNumber),
            })}
        >
            {Object.values(lines).join('\n')}
        </SyntaxHighlighter>
    );
}

export default CodeEditor;
