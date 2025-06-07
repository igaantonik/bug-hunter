import React, { ReactElement } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styled from 'styled-components';
import { File } from '../../../types';
import CodeSmellsGallery from './CodeSmellsGallery';

const Container = styled.div`
    flex: 4;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;

    h3 {
        font-size: 35px;
        margin: 0;
    }

    width: 0px;
`;

const CodeWrapper = styled.div`
    position: relative; /* Potrzebne do pozycjonowania przycisku */
`;

const CodeEditorHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
`;

export interface CodeEditorProps {
    file: File;
    headerComponent?: ReactElement;
    onMouseOverLine?: (event: React.MouseEvent, lineNumber: number) => void;
    getLineBackgroundColor?: (lineNumber: number) => string;
    // code wrapper props
    ref?: React.RefObject<HTMLDivElement | null>;
    onMouseLeave?: () => void;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
}

function CodeEditor({
    file,
    headerComponent,
    onMouseOverLine,
    getLineBackgroundColor,
    ...codeWrapperProps
}: CodeEditorProps) {
    return (
        <Container>
            <h3>{file.name}</h3>
            <CodeWrapper {...codeWrapperProps}>
                <CodeEditorHeader>
                    {headerComponent}
                    <CodeSmellsGallery />
                </CodeEditorHeader>
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
                            backgroundColor:
                                getLineBackgroundColor?.(lineNumber),
                            textWrap: 'wrap',
                        },
                        onMouseOver: (event) =>
                            onMouseOverLine?.(event, lineNumber),
                    })}
                >
                    {Object.values(file.lines).join('\n')}
                </SyntaxHighlighter>
            </CodeWrapper>
        </Container>
    );
}

export default CodeEditor;
