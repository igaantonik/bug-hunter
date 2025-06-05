import { PredefinedSmell } from '../types';

export function formatPredefinedSmells(
    predefined_smells: PredefinedSmell[]
): string {
    return predefined_smells
        .map((smell) => `${JSON.stringify(smell.lines)};${smell.id}`)
        .join(',');
}
