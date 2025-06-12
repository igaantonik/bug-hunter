import React, { useEffect } from 'react';
import styled from 'styled-components';
import { File } from '../../../types';

const Container = styled.div`
    padding: 20px;
    box-shadow: 0px 3px 6px rgba(202, 0, 19, 0.1);
    border: 2px solid rgba(202, 0, 19, 0.4);
    border-radius: 10px;
    background-color: #fff;

    h3 {
        font-size: 25px;
        margin: 0;
        color: #ca0013;
        font-family: 'Paytone One', sans-serif;
    }
`;

const FilesList = styled.ul`
    list-style: none;
    padding-left: 0;
    margin-top: 15px;
`;

const FilesListItem = styled.li<{ $isSelected: boolean }>`
    background-color: ${({ $isSelected }) =>
        $isSelected ? 'rgba(202, 0, 19, 0.1)' : '#f9f9f9'};
    color: ${({ $isSelected }) => ($isSelected ? '#ca0013' : '#333')};
    padding: 12px 16px;
    margin: 8px 0;
    border: 1px solid
        ${({ $isSelected }) =>
            $isSelected ? 'rgba(202, 0, 19, 0.4)' : 'transparent'};
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${({ $isSelected }) =>
            $isSelected ? 'rgba(202, 0, 19, 0.15)' : '#eee'};
    }
`;

interface FileNavigatorProps {
    files: File[];
    selectedFileId?: string;
    setSelectedFileId: React.Dispatch<React.SetStateAction<string | undefined>>;
    onFilesListItemClick?: (fileId?: string) => void;
}

function FileNavigator({
    files,
    selectedFileId,
    setSelectedFileId,
    onFilesListItemClick,
}: FileNavigatorProps) {
    const filesListItemClickHandler = (fileId?: string) => {
        setSelectedFileId(fileId);
        onFilesListItemClick?.(fileId);
    };

    useEffect(() => {
        if (files && files[0] && files[0]._id && selectedFileId === undefined) {
            setSelectedFileId(files[0]._id);
            onFilesListItemClick?.(files[0]._id);
        }
    }, [files, selectedFileId, setSelectedFileId, onFilesListItemClick]);

    return (
        <Container>
            <h3>Files</h3>
            <FilesList>
                {files.map((file) => (
                    <FilesListItem
                        key={file._id}
                        $isSelected={selectedFileId === file._id}
                        onClick={() => filesListItemClickHandler(file._id)}
                    >
                        {file.name}
                    </FilesListItem>
                ))}
            </FilesList>
        </Container>
    );
}

export default FileNavigator;
