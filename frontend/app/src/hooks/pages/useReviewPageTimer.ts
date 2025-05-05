import { useEffect, useState } from 'react';

interface UseReviewPageTimerResult {
    currentTimeSeconds: number;
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

    return {
        currentTimeSeconds: seconds,
    };
};
