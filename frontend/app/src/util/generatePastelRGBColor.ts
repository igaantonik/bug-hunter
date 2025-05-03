export function generatePastelRGBColor(): string {
    const getPastelValue = () => Math.floor(Math.random() * 128) + 127;

    const r = getPastelValue();
    const g = getPastelValue();
    const b = getPastelValue();

    return `rgb(${r}, ${g}, ${b})`;
}
