import React from 'react';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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

interface ReviewPageCodeEditorProps {
    file: { id: string; name: string; lines: Record<string, string> };
}

function ReviewPageCodeEditor({ file }: ReviewPageCodeEditorProps) {
    return (
        <Container>
            <h3>{file.name}</h3>
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
                    },
                    onClick() {
                        alert(`Line Number Clicked: ${lineNumber}`);
                    },
                })}
            >
                {Object.values(file.lines).join('\n')}
            </SyntaxHighlighter>
        </Container>
    );
}

export default ReviewPageCodeEditor;
