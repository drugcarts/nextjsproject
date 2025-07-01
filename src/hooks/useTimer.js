import {useCallback, useEffect, useRef, useState} from 'react';

export function useTimer({initcounter = 900, initStart = true}) {
  const [timer, setTimer] = useState(initcounter);
  const [startTimer, setTimerStart] = useState(initStart);
  const interval = useRef(null);

  const resetTimer = useCallback(() => {
    clearInterval(interval.current);
    setTimer(initcounter);
    setTimerStart(initStart);
  }, [initcounter, initStart]);

  useEffect(() => {
    if (timer < 1) {
      setTimerStart(false);
      return;
    }
    if (startTimer) {
      interval.current = setInterval(() => setTimer(timer => timer - 1), 1000);
    }
    return () => clearInterval(interval.current);
  }, [timer, startTimer]);

  return {
    timer,
    startTimer,
    setTimerStart,
    resetTimer,
  };
}