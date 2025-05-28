import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { File, ReviewedSmell } from '../../types';

interface UseCodeEditorProps {
    file: File;
}

interface UseCodeEditorResult {
    handleMouseOverLine: (event: React.MouseEvent, lineNumber: number) => void;
    handleSmellSelection: (smellId: string | undefined) => void;
    showContextMenu: boolean;
    contextMenuProps: {
        ref: React.RefObject<HTMLDivElement | null>;
        top: number | null;
        left: number;
    };
    plusButtonProps: {
        top: number | number;
        onClick: () => void;
    };
    codeWrapperProps: {
        ref: React.RefObject<HTMLDivElement | null>;
        onMouseLeave: () => void;
    };
}

export const useCodeEditor = ({
    file,
}: UseCodeEditorProps): UseCodeEditorResult => {
    const [hoveredLine, setHoveredLine] = useState<number | null>(null);
    const [buttonTop, setButtonTop] = useState<number | null>(null);
    const [reviewedSmells, setReviewedSmells] = useState<ReviewedSmell[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState<{
        top: number;
        left: number;
    } | null>(null);
    const [selectedLine, setSelectedLine] = useState<number | null>(null);

    const codeWrapperRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleMouseOverLine = (
        event: React.MouseEvent,
        lineNumber: number
    ) => {
        if (codeWrapperRef.current && !isMenuOpen) {
            const lineElement = event.currentTarget as HTMLElement;
            const topPosition = lineElement.offsetTop;
            setHoveredLine(lineNumber);
            setButtonTop(topPosition);
        }
    };

    const handleMouseLeaveEditor = () => {
        if (!isMenuOpen) {
            setHoveredLine(null);
            setButtonTop(null);
        }
    };

    const handlePlusButtonClick = () => {
        if (hoveredLine && buttonTop !== null) {
            setSelectedLine(hoveredLine);
            setMenuPosition({
                top: buttonTop + 30,
                left: 35,
            });
            setIsMenuOpen(true);
        }
    };

    const handleSmellSelection = (smellId: string | undefined) => {
        if (selectedLine) {
            const existingSmell = reviewedSmells.find(
                (smell) =>
                    smell.file_id === file._id &&
                    smell.line === selectedLine.toString()
            );
            if (existingSmell) {
                setReviewedSmells((prev) =>
                    prev.filter(
                        (smell) =>
                            smell.file_id !== file._id ||
                            smell.line !== selectedLine.toString()
                    )
                );
            }
            if (smellId && file && file._id !== undefined) {
                setReviewedSmells((prev) => [
                    ...prev,
                    {
                        file_id: file._id ?? '',
                        line: selectedLine.toString(),
                        smell_id: smellId,
                    },
                ]);
            }
            console.log(reviewedSmells);
            setIsMenuOpen(false);
            setSelectedLine(null);
            setHoveredLine(null);
            setButtonTop(null);
        }
    };

    useOnClickOutside(menuRef, () => {
        setIsMenuOpen(false);
    });

    return {
        handleMouseOverLine,
        handleSmellSelection,
        showContextMenu: isMenuOpen && !!menuPosition,
        contextMenuProps: {
            ref: menuRef,
            left: menuPosition?.left ?? 0,
            top: menuPosition?.top ?? 0,
        },
        plusButtonProps: {
            top: buttonTop,
            onClick: handlePlusButtonClick,
        },
        codeWrapperProps: {
            ref: codeWrapperRef,
            onMouseLeave: handleMouseLeaveEditor,
        },
    };
};
