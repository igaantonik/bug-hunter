import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ReviewStore {
    isMenuOpen: boolean;
    setIsMenuOpen: (val: boolean) => void;

    currentSelection: (number | null)[];
    setCurrentSelection: (start: number | null, end: number | null) => void;

    selectedSmells: Record<string, Record<string, string>>;
    setSelectedSmells: (
        fileId: string,
        lines: number[],
        smellId: string
    ) => void;
    removeSelectedSmells: (fileId: string, lines: number[]) => void;
}

const useReviewStore = create<ReviewStore>()(
    persist(
        (set) => ({
            isMenuOpen: false,
            setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen }),
            currentSelection: [null, null],
            setCurrentSelection: (start, end) =>
                set({ currentSelection: [start, end] }),
            selectedSmells: {},
            setSelectedSmells: (fileId, lines, smellId) =>
                set((state) => {
                    const stateCopy = { ...state };
                    if (!stateCopy.selectedSmells[fileId])
                        stateCopy.selectedSmells[fileId] = {};
                    lines.forEach((lineNumber) => {
                        stateCopy.selectedSmells[fileId][
                            lineNumber.toString()
                        ] = smellId;
                    });
                    return stateCopy;
                }),
            removeSelectedSmells: (fileId: string, lines: number[]) =>
                set((state) => {
                    const fileSmells = state.selectedSmells[fileId];

                    if (!fileSmells) return { ...state };

                    const updatedFileSmells = { ...fileSmells };

                    lines.forEach((line) => {
                        const lineKey = line.toString();
                        delete updatedFileSmells[lineKey];
                    });

                    return {
                        selectedSmells: {
                            ...state.selectedSmells,
                            [fileId]: updatedFileSmells,
                        },
                    };
                }),
        }),
        {
            name: 'review-storage',
        }
    )
);

export default useReviewStore;
