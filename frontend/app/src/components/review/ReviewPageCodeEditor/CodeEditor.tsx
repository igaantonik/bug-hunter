import { ReactElement } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styled from 'styled-components';
import { File } from '../../../types';
import CodeSmellsGallery from './CodeSmellsGallery';

const Container = styled.div`
    flex: 4;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0px 3px 6px rgba(202, 0, 19, 0.1);
    border: 2px solid rgba(202, 0, 19, 0.4);
    border-radius: 12px;
    position: relative;
    width: 0;

    h3 {
        font-size: 28px;
        margin: 0;
        color: #ca0013;
        font-family: 'Paytone One', sans-serif;
    }
`;

const CodeWrapper = styled.div`
    border-radius: 6px;
    overflow: hidden;
`;

const CodeEditorHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 16px 0;
`;

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
    font-size: 15px !important;
    line-height: 1.8;
    padding: 20px 10px !important;
    border-radius: 6px;
    background-color: #f9f9f9 !important;
    border: 1px solid rgba(202, 0, 19, 0.1);
`;

const StyledLine = (bgColor?: string): React.CSSProperties => ({
    display: 'block',
    cursor: 'pointer',
    paddingLeft: '20px',
    paddingRight: '20px',
    userSelect: 'none',
    backgroundColor: bgColor || 'transparent',
    whiteSpace: 'pre-wrap',
});


export interface CodeEditorProps {
    file: File;
    headerComponent?: ReactElement;
    onMouseOverLine?: (event: React.MouseEvent, lineNumber: number) => void;
    getLineBackgroundColor?: (lineNumber: number) => string;
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
            <CodeEditorHeader>
                {headerComponent}
                <CodeSmellsGallery />
            </CodeEditorHeader>
            <CodeWrapper {...codeWrapperProps}>
                <StyledSyntaxHighlighter
                    showLineNumbers
                    language="javascript"
                    style={vs}
                    wrapLines
                    lineProps={(lineNumber: number) => ({
                        style: StyledLine(getLineBackgroundColor?.(lineNumber)),
                        onMouseOver: (event: React.MouseEvent<HTMLDivElement>) =>
                            onMouseOverLine?.(event, lineNumber),
                    })}
                >
                    {Object.values(file.lines).join('\n')}
                </StyledSyntaxHighlighter>
            </CodeWrapper>
        </Container>
    );
}

export default CodeEditor;
