import { useCallback, useMemo, useRef } from 'react';
import { CustomContextMenuItem } from '../../../components/review/ReviewPageCodeEditor/CustomContextMenu';
import { useSmellsQuery } from '../../api/queries/useSmellsQuery';
import { useReviewPageCodeEditorMouseEvents } from './useReviewPageCodeEditorMouseEvents';
import useReviewStore from '../../../store/useReviewStore';
import { range } from '../../../util/range';

interface UseReviewPageCodeEditorProps {
    fileId: string | undefined;
}

interface UseReviewPageCodeEditorResult {
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

export const useReviewPageCodeEditor = ({
    fileId,
}: UseReviewPageCodeEditorProps): UseReviewPageCodeEditorResult => {
    const {
        isMenuOpen,
        setIsMenuOpen,
        setCurrentSelection,
        currentSelection,
        setSelectedSmells,
        removeSelectedSmells,
        hasTimerEnded,
    } = useReviewStore();

    const menuRef = useRef<HTMLDivElement>(null);

    const handleSelectionEnd = (s: number, e: number, topOffset: number) => {
        if (!menuRef.current) return;
        menuRef.current.style.top = `${topOffset + 30}px`;
        menuRef.current.style.left = `${35}px`;
        setIsMenuOpen(true);
        setCurrentSelection(s, e);
    };

    const handleSelectionMouseOver = (s: number, e: number) => {
        setCurrentSelection(s, e);
    };

    const mouseProps = useReviewPageCodeEditorMouseEvents({
        disableMouseEvents: isMenuOpen || hasTimerEnded,
        onSelectionEnd: handleSelectionEnd,
        onSelectionMouseOver: handleSelectionMouseOver
    });

    const handleSmellSelection = useCallback(
        (smellId: string | undefined) => {
            if (
                fileId !== undefined &&
                currentSelection[0] &&
                currentSelection[1]
            ) {
                const lines = range(currentSelection[0], currentSelection[1]);
                if (smellId === undefined) {
                    removeSelectedSmells(fileId, lines);
                } else {
                    setSelectedSmells(fileId, lines, smellId);
                }
            }
            setIsMenuOpen(false);
            setCurrentSelection(null, null);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [fileId, currentSelection[0], currentSelection[1]]
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
