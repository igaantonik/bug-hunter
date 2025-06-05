//Parses a string of line numbers/ranges (e.g., "1,2,5-7,10") into an array of unique numbers.
export function parseLinesString(linesStr: string): number[] {
    const BATCH_DELIM = ',';
    const RANGE_DELIM = '-';
    const result: Set<number> = new Set();

    if (!linesStr || linesStr.trim() === '') {
        return [];
    }

    const batches = linesStr.split(BATCH_DELIM);
    for (const batch of batches) {
        const parts = batch.trim().split(RANGE_DELIM);
        if (parts.length === 1) {
            const lineNumber = parseInt(parts[0], 10);
            if (!isNaN(lineNumber) && lineNumber > 0) {
                result.add(lineNumber);
            }
        } else if (parts.length === 2) {
            const start = parseInt(parts[0], 10);
            const end = parseInt(parts[1], 10);
            if (!isNaN(start) && !isNaN(end) && start > 0 && start <= end) {
                for (let i = start; i <= end; i++) {
                    result.add(i);
                }
            }
        }
    }
    return Array.from(result).sort((a, b) => a - b);
}