import { useEffect, useState } from 'react';
import useReviewStore from '../../../store/useReviewStore.ts';

interface UseReviewPageTimerResult {
    currentTimeSeconds: number;
}

export const useReviewPageTimer = (
    initialTimeSeconds: number
): UseReviewPageTimerResult => {
    const [seconds, setSeconds] = useState(initialTimeSeconds);
    const [isActive, setIsActive] = useState(false);
    const [timerInterval, setTimerInterval] = useState<any>(null);

    const { setHasTimerEnded } = useReviewStore()

    function startTimer() {
        setIsActive(true);
    }

    function stopTimer() {
        setIsActive(false);
    }

    useEffect(() => {
        if (isActive && !timerInterval && initialTimeSeconds > 0) {
            const interval = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);
            setTimerInterval(interval);
        } else if ((!isActive || seconds === 0) && timerInterval) {
            clearInterval(timerInterval);
            setHasTimerEnded(true);
            setTimeout(() => {
                alert("Time is up! Please submit your review.");
            }, 50)
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
