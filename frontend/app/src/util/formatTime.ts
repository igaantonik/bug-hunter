export function formatTime(currentTimeSeconds: number) {
    const minutes = Math.floor(currentTimeSeconds / 60);
    const remainingSeconds = currentTimeSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}
