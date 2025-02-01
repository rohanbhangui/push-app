import React, { createContext, useState, useContext, useEffect } from 'react';

interface Timer {
  title: string;
  seconds: number;
}

interface TimerContextType {
  timers: Timer[];
  addTimer: (timer: Timer) => void;
  updateTimer: (index: number, updatedTimer: Timer) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

interface TimerProviderProps {
  children: React.ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [timers, setTimers] = useState<Timer[]>(() => {
    const savedTimers = localStorage.getItem('push_app');
    return savedTimers ? JSON.parse(savedTimers) : [];
  });

  useEffect(() => {
    localStorage.setItem('push_app', JSON.stringify(timers));
  }, [timers]);

  const addTimer = (timer: Timer) => {
    setTimers((prevTimers) => [...prevTimers, timer]);
  };

  const updateTimer = (index: number, updatedTimer: Timer) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer, i) => (i === index ? updatedTimer : timer))
    );
  };

  return (
    <TimerContext.Provider value={{ timers, addTimer, updateTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = (): TimerContextType => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
};