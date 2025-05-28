import { useEffect, useState } from 'react';

interface UseReviewPageTimerResult {
    currentTimeSeconds: number;
}

export const useReviewPageTimer = (
    initialTimeSeconds: number
): UseReviewPageTimerResult => {
    const [seconds, setSeconds] = useState(initialTimeSeconds);
    const [isActive, setIsActive] = useState(false);
    const [timerInterval, setTimerInterval] = useState<any>(null);

    function startTimer() {
        setIsActive(true);
    }

    function stopTimer() {
        setIsActive(false);
    }

    useEffect(() => {
        if (isActive && !timerInterval) {
            const interval = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);
            setTimerInterval(interval);
        } else if ((!isActive || seconds === 0) && timerInterval) {
            clearInterval(timerInterval);
        }
    }, [isActive, seconds]);

    useEffect(() => {
        startTimer();

        return () => stopTimer();
    }, []);

    return {
        currentTimeSeconds: seconds,
    };
};
