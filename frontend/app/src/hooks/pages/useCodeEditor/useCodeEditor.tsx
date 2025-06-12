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
    const {
        isMenuOpen,
        setIsMenuOpen,
        setCurrentSelection,
        currentSelection,
        setSelectedSmells,
        removeSelectedSmells,
    } = useReviewStore();

    const mouseProps = useCodeEditorMouseEvents({
        disableMouseEvents: isMenuOpen,
        onSelectionEnd: (s, e) => {
            setCurrentSelection(s, e);
        },
    });

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
