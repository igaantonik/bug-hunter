import { useCallback, useMemo, useRef, useState } from 'react';
import { File } from '../../../types';
import { CustomContextMenuItem } from '../../../components/review/ReviewPageCodeEditor/CustomContextMenu';
import { useSmellsQuery } from '../../api/queries/useSmellsQuery';
// import {
//     LineSelectionActionKind,
//     useLineSelectionReducer,
// } from '../../reducers/codeEditorReducer';
import { useCodeEditorMouseEvents } from './useCodeEditorMouseEvents';

interface UseCodeEditorProps {
    file: File;
}

interface UseCodeEditorResult {
    handleMouseOverLine: (event: React.MouseEvent, lineNumber: number) => void;
    contextMenuProps: {
        ref: React.RefObject<HTMLDivElement | null>;
        items: CustomContextMenuItem[];
        isOpen: boolean;
        setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    };
    plusButtonProps: {
        top: number | null;
        onClick: () => void;
    };
    codeWrapperProps: {
        ref: React.RefObject<HTMLDivElement | null>;
        onMouseLeave: () => void;
        onMouseDown: () => void;
        onMouseUp: () => void;
    };
}

export const useCodeEditor = ({
    file,
}: UseCodeEditorProps): UseCodeEditorResult => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const mouseProps = useCodeEditorMouseEvents({
        disableMouseEvents: isMenuOpen,
        onSelectionEnd: (s, e) => {
            handlePlusButtonClick();
            alert(`SELECTION IS: ${s} ${e}`);
        },
    });
    // const [hoveredLine, setHoveredLine] = useState<number | null>(null);
    // const [buttonTop, setButtonTop] = useState<number | null>(null);
    // const [selectedLine, setSelectedLine] = useState<number | null>(null);
    // const [reviewedSmells, setReviewedSmells] = useState<ReviewedSmell[]>([]);

    // const codeWrapperRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const handlePlusButtonClick = () => {
        if (mouseProps.topOffset !== null) {
            if (!menuRef.current) return;
            menuRef.current.style.top = `${mouseProps.topOffset + 30}px`;
            menuRef.current.style.left = `${35}px`;
            setIsMenuOpen(true);
        }
    };

    const handleSmellSelection = useCallback(
        (smellId: string | undefined) => {
            // if (selectedLine) {
            // const existingSmell = reviewedSmells.find(
            //     (smell) =>
            //         smell.file_id === file._id &&
            //         smell.line === selectedLine.toString()
            // );
            // if (existingSmell) {
            // setReviewedSmells((prev) =>
            //     prev.filter(
            //         (smell) =>
            //             smell.file_id !== file._id ||
            //             smell.line !== selectedLine.toString()
            //     )
            // );
            // }
            if (smellId && file && file._id !== undefined) {
                // setReviewedSmells((prev) => [
                //     ...prev,
                //     {
                //         file_id: file._id ?? '',
                //         line: selectedLine.toString(),
                //         smell_id: smellId,
                //     },
                // ]);
            }
            setIsMenuOpen(false);
            // setSelectedLine(null);
            // setHoveredLine(null);
            // setButtonTop(null);
            // }
        },
        // [file, reviewedSmells, selectedLine]
        [file]
    );

    const { data: smells } = useSmellsQuery();

    const contextMenuItems = useMemo(
        () =>
            smells
                ? [
                      ...smells.map((smell) => ({
                          id: smell._id ?? '',
                          label: smell.name,
                          onClick: () => handleSmellSelection(smell._id),
                      })),
                      {
                          id: 'removeSmell',
                          label: 'Remove Smell',
                          onClick: () => handleSmellSelection(undefined),
                      },
                  ]
                : [],
        [smells, handleSmellSelection]
    );

    // return {
    //     handleMouseOverLine,
    //     contextMenuProps: {
    //         items: contextMenuItems,
    //         ref: menuRef,
    //         isOpen: isMenuOpen,
    //         setIsOpen: setIsMenuOpen,
    //     },
    //     plusButtonProps: {
    //         top: buttonTop,
    //         onClick: handlePlusButtonClick,
    //     },
    //     codeWrapperProps: {
    //         ref: codeWrapperRef,
    //         onMouseLeave: handleMouseLeaveEditor,
    //     },
    // };

    return {
        handleMouseOverLine: mouseProps.handleMouseOverLine,
        contextMenuProps: {
            items: contextMenuItems,
            ref: menuRef,
            isOpen: isMenuOpen,
            setIsOpen: setIsMenuOpen,
        },
        plusButtonProps: {
            top: mouseProps.topOffset,
            onClick: handlePlusButtonClick,
        },
        codeWrapperProps: {
            ref: mouseProps.codeWrapperRef,
            onMouseLeave: mouseProps.handleMouseLeaveEditor,
            onMouseDown: mouseProps.handleMouseDown,
            onMouseUp: mouseProps.handleMouseUp,
        },
    };
};
