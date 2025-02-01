import React, { useEffect, useState } from 'react';
import { useTimerContext } from '../../Context';

type TimerProps = {
  startTime: number;
  activeTimer: string;
  timerTitle: string;
};

const Timer: React.FC<TimerProps> = ({
  activeTimer,
  startTime,
  timerTitle,
}) => {
  const [time, setTime] = useState(startTime);
  const [isRunning, setIsRunning] = useState(false);
  const [showAddTime, setShowAddTime] = useState(false);

  const { updateTimer } = useTimerContext();

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRunning) {
      timer = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime > 0 ? prevTime - 1 : 0;
          updateTimer(activeTimer, { title: timerTitle, seconds: newTime });
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    setTime(startTime);
  }, [startTime]);

  useEffect(() => {
    setIsRunning(false);
  }, [activeTimer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    if (time > 0) {
      setIsRunning(prev => !prev);
    }
  };

  const handleAddTime = (seconds: number) =>
    setTime(prevTime => Math.min(prevTime + seconds, 5999));

  const handleStop = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="group">
      <div className="text-center text-gray-700">{timerTitle}</div>
      <div className="text-center text-9xl">
        <span className="hubot-sans-main">{formatTime(time)}</span>
      </div>

      <div className="mt-4 flex justify-center items-center space-x-2 ">
        <button
          onClick={handleStartPause}
          className={`px-4 py-2 w-12 h-12 rounded-full bg-transparent text-gray-700 flex items-center justify-center inter-regular text-base group-hover:bg-gray-700 group-hover:text-white transition duration-150 ease-in-out`}
          disabled={time === 0}
        >
          <ion-icon name={isRunning ? 'pause' : 'play'} />
        </button>
        <button
          onClick={handleStop}
          className="px-4 py-2 w-12 h-12 bg-transparent text-gray-700 rounded-full flex items-center justify-center inter-regular text-base group-hover:bg-red-500 group-hover:text-white transition duration-150 ease-in-out"
        >
          <ion-icon name="stop" />
        </button>
        {showAddTime ? (
          <>
            <button
              onClick={() => handleAddTime(15)}
              className="px-4 py-2 h-12 bg-transparent text-gray-700 rounded-full flex items-center justify-center inter-regular text-base group-hover:bg-gray-700 group-hover:text-white transition duration-150 ease-in-out"
            >
              + 15s
            </button>
            <button
              onClick={() => handleAddTime(30)}
              className="px-4 py-2 h-12 bg-transparent text-gray-700 rounded-full flex items-center justify-center inter-regular text-base group-hover:bg-gray-700 group-hover:text-white transition duration-150 ease-in-out"
            >
              + 30s
            </button>
            <button
              onClick={() => handleAddTime(300)}
              className="px-4 py-2 h-12 bg-transparent text-gray-700 rounded-full flex items-center justify-center inter-regular text-base group-hover:bg-gray-700 group-hover:text-white transition duration-150 ease-in-out"
            >
              + 5m
            </button>
            <button
              onClick={() => setShowAddTime(false)}
              className="px-4 py-2 h-12 bg-transparent text-gray-700 rounded-full flex items-center justify-center inter-regular text-base group-hover:bg-transparent group-hover:text-white transition duration-150 ease-in-out"
            >
              <ion-icon name="close-sharp" />
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowAddTime(true)}
            className="px-4 py-2 h-12 bg-transparent text-gray-700 rounded-full flex items-center justify-center inter-regular text-base group-hover:bg-gray-700 group-hover:text-white transition duration-150 ease-in-out"
          >
            Add Time
          </button>
        )}
      </div>
    </div>
  );
};

export default Timer;
