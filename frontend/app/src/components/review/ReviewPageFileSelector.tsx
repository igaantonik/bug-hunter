import React from 'react';
import styled from 'styled-components';
import { File } from '../../types';

const Container = styled.div`
    flex: 1;
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
        $isSelected ? '#dbeafe' : 'none'};
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

interface ReviewPageFileSelectorProps {
    files: File[];
    selectedFileId?: string;
    onFilesListItemClick: (fileId?: string) => void;
}

function ReviewPageFileSelector({
    files,
    selectedFileId,
    onFilesListItemClick,
}: ReviewPageFileSelectorProps) {
    return (
        <Container>
            <h3>Files</h3>
            <FilesList>
                {files.map((file) => (
                    <FilesListItem
                        key={file._id}
                        $isSelected={selectedFileId === file._id}
                        onClick={() => onFilesListItemClick(file._id)}
                    >
                        {file.name}
                    </FilesListItem>
                ))}
            </FilesList>
        </Container>
    );
}

export default ReviewPageFileSelector;
