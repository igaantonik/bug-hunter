import React from 'react';
import styled from 'styled-components';
import PageContainer from '../components/shared/PageContainer';
import ReviewPageHeader from '../components/review/ReviewPageHeader';
import { useReviewPage } from '../hooks/pages/review/useReviewPage';
import IDE from '../components/shared/IDE/IDE';
import CustomContextMenu from '../components/review/ReviewPageCodeEditor/CustomContextMenu';
import { useReviewPageCodeEditor } from '../hooks/pages/review/useReviewPageCodeEditor';
import SubmitIcon from '../assets/done-btn.png';

const Button = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
    font-family: 'Paytone One', sans-serif;
    background-color: #ca0013;
    color: white;

    &:hover {
        background-color: #a80010;
    }

    img {
        width: 30px;
        height: 30px;
    }
`;

function ReviewPage() {
    const {
        files,
        reviewPageHeaderProps,
        reviewSubmitHandler,
        selectedFileId,
        setSelectedFileId,
        getLineBackgroundColor,
    } = useReviewPage();

    const { contextMenuProps, handleMouseOverLine, codeWrapperProps } =
        useReviewPageCodeEditor({ fileId: selectedFileId });

    return (
        <PageContainer>
            <ReviewPageHeader {...reviewPageHeaderProps} />
            <IDE
                files={files ?? []}
                onFileSelectionChange={setSelectedFileId}
                codeEditorProps={{
                    getLineBackgroundColor,
                    onMouseOverLine: handleMouseOverLine,
                    ...codeWrapperProps,
                    headerComponent: (
                        <>
                            <CustomContextMenu {...contextMenuProps} />

                            <Button
                                onClick={async () => {
                                    await reviewSubmitHandler();
                                }}
                            >
                                Submit
                                <img src={SubmitIcon} alt="Submit Icon" />
                            </Button>
                        </>
                    ),
                }}
            />
        </PageContainer>
    );
}
export default ReviewPage;
