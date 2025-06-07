import React, { useState } from 'react';
import styled from 'styled-components';
import FileNavigator from './FileNavigator';
import { File } from '../../../types';
import CodeEditor, {
    CodeEditorProps,
} from '../../review/ReviewPageCodeEditor/CodeEditor';

const WorkspaceContainer = styled.div`
    display: flex;
    flex: 1;
    gap: 10px;
`;

interface IDEProps {
    files: File[];
    onFileSelectionChange?: (fileId?: string) => void;
    codeEditorProps?: Omit<CodeEditorProps, 'file'>;
}

function IDE({ files, onFileSelectionChange, codeEditorProps }: IDEProps) {
    const [selectedFileId, setSelectedFileId] = useState<string | undefined>(
        undefined
    );

    const selectedFile: File | undefined = files?.find(
        (file) => file._id === selectedFileId
    );

    return (
        <WorkspaceContainer>
            <FileNavigator
                files={files}
                selectedFileId={selectedFileId}
                setSelectedFileId={setSelectedFileId}
                onFilesListItemClick={onFileSelectionChange}
            />
            {selectedFile && (
                <CodeEditor file={selectedFile} {...codeEditorProps} />
            )}
        </WorkspaceContainer>
    );
}

export default IDE;
