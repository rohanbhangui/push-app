import React, { useEffect, useState } from 'react';

type TimerProps = {
  startTime: number;
}

const Timer: React.FC<TimerProps> = ({ startTime }) => {
  const [time, setTime] = useState(startTime);
  const [isRunning, setIsRunning] = useState(false);
  const [showAddTime, setShowAddTime] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    if (time > 0) {
      setIsRunning((prev) => !prev);
    }
  };

  const handleAddTime = (seconds: number) => setTime((prevTime) => Math.min(prevTime + seconds, 5999));

  const handleStop = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="text-center text-9xl">
      {formatTime(time)}
      <div className="mt-4 flex justify-center items-center space-x-2">
        <button 
          onClick={handleStartPause}
          className={`px-4 py-2 w-12 h-12 rounded-full ${isRunning ? 'bg-gray-700' : 'bg-gray-700'} text-white flex items-center justify-center inter-regular text-base ${time === 0 ? 'opacity-33' : ''}`}
          disabled={time === 0}
        >
          <ion-icon name={isRunning ? 'pause' : 'play'} />
        </button>
        <button onClick={handleStop} className="px-4 py-2 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center inter-regular text-base"><ion-icon name="stop" /></button>
        {showAddTime ? (
          <>
            <button onClick={() => handleAddTime(15)} className="px-4 py-2 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center inter-regular text-base">+ 15s</button>
            <button onClick={() => handleAddTime(30)} className="px-4 py-2 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center inter-regular text-base">+ 30s</button>
            <button onClick={() => handleAddTime(300)} className="px-4 py-2 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center inter-regular text-base">+ 5m</button>
            <button onClick={() => setShowAddTime(false)} className="px-4 py-2 h-12 bg-transparent text-gray-700 rounded-full flex items-center justify-center inter-regular text-base"><ion-icon name="close-sharp" /></button>
          </>
        ) : (
          <button onClick={() => setShowAddTime(true)} className="px-4 py-2 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center inter-regular text-base">Add Time</button>
        )}
      </div>
    </div>
  );
};

export default Timer;