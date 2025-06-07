import React, { useEffect } from 'react';
import styled from 'styled-components';
import { File } from '../../../types';

const Container = styled.div`
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;

    h3 {
        font-size: 25px;
        margin: 0;
    }
`;

const FilesList = styled.ul`
    text-decoration: none;
    list-style: none;
    padding-left: 10px;
`;

const FilesListItem = styled.li<{ $isSelected: boolean }>`
    background-color: ${({ $isSelected }) =>
        $isSelected ? '#dbeafe' : '#f3f3f3'};
    color: ${({ $isSelected }) => ($isSelected ? '#2563EB' : '#000')};
    padding: 10px;
    margin: 10px 0px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: ${({ $isSelected }) =>
            $isSelected ? 'none' : '#eff4fa'};
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
