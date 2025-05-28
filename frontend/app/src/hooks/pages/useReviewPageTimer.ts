import { useEffect, useState } from 'react';

interface UseReviewPageTimerResult {
    currentTimeSeconds: number;
    currentTimeFormattedSeconds: string;
}

export const useReviewPageTimer = (): UseReviewPageTimerResult => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    function startTimer() {
        setIsActive(true);
    }

    function stopTimer() {
        setIsActive(false);
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0 && interval) {
            clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, seconds]);

    useEffect(() => {
        startTimer();

        return () => stopTimer();
    }, []);

    function formatTime(currentTimeSeconds: number) {
        const minutes = Math.floor(currentTimeSeconds / 60);
        const remainingSeconds = currentTimeSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    return {
        currentTimeSeconds: seconds,
        currentTimeFormattedSeconds: formatTime(seconds),
    };
};
