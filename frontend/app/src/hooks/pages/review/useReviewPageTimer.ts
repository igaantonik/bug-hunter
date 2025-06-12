import { useEffect, useState } from 'react';
import useReviewStore from '../../../store/useReviewStore';

interface UseReviewPageTimerResult {
    currentTimeSeconds: number;
}

export const useReviewPageTimer = (
    initialTimeSeconds: number
): UseReviewPageTimerResult => {
    const [seconds, setSeconds] = useState(initialTimeSeconds);
    const [isActive, setIsActive] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [timerInterval, setTimerInterval] = useState<any>(null);

    const { setHasTimerEnded } = useReviewStore();

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
                alert('Time is up! Please submit your review.');
            }, 50);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive, seconds]);

    useEffect(() => {
        startTimer();

        return () => stopTimer();
    }, []);

    return {
        currentTimeSeconds: seconds,
    };
};
