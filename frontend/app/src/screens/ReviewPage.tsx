import styled from 'styled-components';
import PageContainer from '../components/shared/PageContainer';
import ReviewPageHeader from '../components/review/ReviewPageHeader';
import { useReviewPage } from '../hooks/pages/review/useReviewPage';
import IDE from '../components/shared/IDE/IDE';
import CustomContextMenu from '../components/review/ReviewPageCodeEditor/CustomContextMenu';
import { useReviewPageCodeEditor } from '../hooks/pages/review/useReviewPageCodeEditor';

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
                                Submit Review
                            </Button>
                        </>
                    ),
                }}
            />
        </PageContainer>
    );
}
export default ReviewPage;
