import { useEffect, useRef, useState } from 'react';

interface UseReviewPageCodeEditorMouseEventsProps {
    onSelectionEnd?: (
        selectionStartLine: number,
        selectionEndLine: number,
        topOffset: number
    ) => void;
    disableMouseEvents: boolean;
}

export const useReviewPageCodeEditorMouseEvents = (
    props?: UseReviewPageCodeEditorMouseEventsProps
) => {
    const codeWrapperRef = useRef<HTMLDivElement>(null);
    const [hoveredLine, setHoveredLine] = useState<number | null>(null);
    const [topOffset, setTopOffset] = useState<number | null>(null);
    const selectionStartLine = useRef<number>(null);
    const selectionEndLine = useRef<number>(null);

    const handleMouseDown = () => {
        if (props?.disableMouseEvents) return;
        if (hoveredLine !== null) {
            selectionEndLine.current = null;
            selectionStartLine.current = hoveredLine;
        }
    };

    const handleMouseUp = () => {
        if (props?.disableMouseEvents) return;

        if (selectionStartLine.current !== null) {
            selectionEndLine.current = hoveredLine;
            if (selectionEndLine.current !== null) {
                props?.onSelectionEnd?.(
                    Math.min(
                        selectionStartLine.current,
                        selectionEndLine.current
                    ),
                    Math.max(
                        selectionStartLine.current,
                        selectionEndLine.current
                    ),
                    topOffset ?? 0
                );
            }
        }
    };

    const handleMouseOverLine = (
        event: React.MouseEvent,
        lineNumber: number
    ) => {
        if (props?.disableMouseEvents) return;

        if (codeWrapperRef.current) {
            const lineElement = event.currentTarget as HTMLElement;
            const offset = lineElement.offsetTop;
            setHoveredLine(lineNumber);
            setTopOffset(offset);
        }
    };

    const handleMouseLeaveEditor = () => {
        if (props?.disableMouseEvents) return;

        setHoveredLine(null);
    };

    useEffect(() => {
        selectionStartLine.current = null;
        selectionEndLine.current = null;
    }, [props?.disableMouseEvents]);

    return {
        codeWrapperRef,
        handleMouseDown,
        handleMouseUp,
        handleMouseOverLine,
        handleMouseLeaveEditor,
    };
};
