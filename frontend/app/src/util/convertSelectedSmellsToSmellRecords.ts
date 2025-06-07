import { SmellRecord } from '../types';

export const convertSelectedSmellsToSmellRecords = (
    selectedSmells: Record<string, Record<string, string>>
): SmellRecord[] => {
    const smellsIdsToLinesPerFile: Record<
        string,
        Record<string, number[]>
    > = {};

    for (const fileId in selectedSmells) {
        const fileSmells = selectedSmells[fileId];

        for (const line in fileSmells) {
            const smellId = fileSmells[line];

            if (!smellsIdsToLinesPerFile[fileId]) {
                smellsIdsToLinesPerFile[fileId] = {};
            }

            if (!smellsIdsToLinesPerFile[fileId][smellId]) {
                smellsIdsToLinesPerFile[fileId][smellId] = [];
            }

            smellsIdsToLinesPerFile[fileId][smellId].push(parseInt(line, 10));
        }
    }

    const result: SmellRecord[] = [];

    for (const fileId in smellsIdsToLinesPerFile) {
        const smellMap = smellsIdsToLinesPerFile[fileId];
        for (const smellId in smellMap) {
            result.push({
                file_id: fileId,
                smell_id: smellId,
                lines: smellMap[smellId].sort((a, b) => a - b), // opcjonalnie posortuj linie
            });
        }
    }

    return result;
};
