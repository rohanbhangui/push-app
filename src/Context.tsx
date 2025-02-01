import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

export type Timer =  {
  id: string;
  title: string;
  seconds: number;
}

interface TimerContextType {
  timers: Timer[];
  addTimer: (timer: Omit<Timer, 'id'>) => void;
  updateTimer: (id: string, updatedTimer: Omit<Timer, 'id'>) => void;
  deleteTimer: (id: string) => void;
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

  const addTimer = (timer: Omit<Timer, 'id'>) => {
    const newTimer = { ...timer, id: uuid() };
    setTimers((prevTimers) => [...prevTimers, newTimer]);
  };

  const updateTimer = (id: string, updatedTimer: Omit<Timer, 'id'>) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => (timer.id === id ? { ...updatedTimer, id } : timer))
    );
  };

  const deleteTimer = (id: string) => {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
  };

  return (
    <TimerContext.Provider value={{ timers, addTimer, updateTimer, deleteTimer }}>
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