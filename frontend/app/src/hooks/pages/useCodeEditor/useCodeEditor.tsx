import { useCallback, useMemo, useRef } from 'react';
import { File } from '../../../types';
import { CustomContextMenuItem } from '../../../components/review/ReviewPageCodeEditor/CustomContextMenu';
import { useSmellsQuery } from '../../api/queries/useSmellsQuery';
import { useCodeEditorMouseEvents } from './useCodeEditorMouseEvents';
import useReviewStore from '../../../store/useReviewStore';
import { range } from '../../../util/range';

interface UseCodeEditorProps {
    file: File;
}

interface UseCodeEditorResult {
    handleMouseOverLine: (event: React.MouseEvent, lineNumber: number) => void;
    contextMenuProps: {
        ref: React.RefObject<HTMLDivElement | null>;
        items: CustomContextMenuItem[];
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
    const {
        isMenuOpen,
        setIsMenuOpen,
        setCurrentSelection,
        currentSelection,
        setSelectedSmells,
        removeSelectedSmells,
    } = useReviewStore();

    const menuRef = useRef<HTMLDivElement>(null);

    const handleSelectionEnd = (s: number, e: number, topOffset: number) => {
        if (!menuRef.current) return;
        menuRef.current.style.top = `${topOffset + 30}px`;
        menuRef.current.style.left = `${35}px`;
        setIsMenuOpen(true);
        setCurrentSelection(s, e);
    };

    const mouseProps = useCodeEditorMouseEvents({
        disableMouseEvents: isMenuOpen,
        onSelectionEnd: handleSelectionEnd,
    });

    const handleSmellSelection = useCallback(
        (smellId: string | undefined) => {
            if (
                file &&
                file._id !== undefined &&
                currentSelection[0] &&
                currentSelection[1]
            ) {
                const lines = range(currentSelection[0], currentSelection[1]);
                if (smellId === undefined) {
                    removeSelectedSmells(file._id, lines);
                } else {
                    setSelectedSmells(file._id, lines, smellId);
                }
            }
            setIsMenuOpen(false);
            setCurrentSelection(null, null);
        },
        [file, currentSelection[0], currentSelection[1]]
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

    return {
        handleMouseOverLine: mouseProps.handleMouseOverLine,
        contextMenuProps: {
            items: contextMenuItems,
            ref: menuRef,
        },
        codeWrapperProps: {
            ref: mouseProps.codeWrapperRef,
            onMouseLeave: mouseProps.handleMouseLeaveEditor,
            onMouseDown: mouseProps.handleMouseDown,
            onMouseUp: mouseProps.handleMouseUp,
        },
    };
};
