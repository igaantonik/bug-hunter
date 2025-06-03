import React from 'react';
import styled from 'styled-components';
import { File } from '../../../types';
import { useCodeEditor } from '../../../hooks/pages/useCodeEditor/useCodeEditor';
import CustomContextMenu from './CustomContextMenu';
import CodeSmellsGallery from './CodeSmellsGallery';
import CodeEditor from './CodeEditor';

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

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;

    &:hover {
        background-color: #e0e0e0;
    }
`;

interface ReviewPageCodeEditorProps {
    file: File;
    reviewSubmitHandler: () => Promise<void>;
}

function ReviewPageCodeEditor({
    file,
    reviewSubmitHandler,
}: ReviewPageCodeEditorProps) {
    const { contextMenuProps, handleMouseOverLine, codeWrapperProps } =
        useCodeEditor({ file });

    return (
        <Container>
            <h3>{file.name}</h3>
            <CodeWrapper {...codeWrapperProps}>
                <CustomContextMenu {...contextMenuProps} />
                <Row>
                    <Button
                        onClick={async () => {
                            await reviewSubmitHandler();
                        }}
                    >
                        Submit Review
                    </Button>
                    <CodeSmellsGallery />
                </Row>

                <CodeEditor
                    lines={file.lines}
                    handleMouseOverLine={handleMouseOverLine}
                    fileId={file._id}
                />
            </CodeWrapper>
        </Container>
    );
}

export default ReviewPageCodeEditor;
