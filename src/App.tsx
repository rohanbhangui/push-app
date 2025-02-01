import './App.css'
import Timer from './components/Timer'

import { useTimerContext } from './Context';
import { useState } from 'react';

const App = () => {
  const { timers, addTimer } = useTimerContext();
  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskTime, setTaskTime] = useState(0);

  const handleTimerClick = (index: number) => {
    setActiveTimer(index);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTimer({ title: taskName, seconds: taskTime });
    setTaskName('');
    setTaskTime(0);
    setShowForm(false);
  };

  console.log("DEBUG", timers[activeTimer])

  return (
    <main className="bg-black flex flex-col justify-center items-center h-full min-h-screen">
      <Timer timerIndex={activeTimer !== null ? activeTimer : -1} timerTitle={activeTimer !== null ? timers[activeTimer].title : ''} startTime={activeTimer !== null ? timers[activeTimer].seconds : 900} />
      <button 
        onClick={() => setShowForm(true)} 
        className="mt-4 px-4 py-2 border border-gray-500 text-gray-500 rounded-full hover:bg-gray-700 hover:text-white transition"
      >
        Add Timer
      </button>
      {showForm && (
        <form 
          onSubmit={handleFormSubmit} 
          className="mt-4 flex flex-col items-center space-y-2"
        >
          <input 
            type="text" 
            placeholder="Task Name" 
            value={taskName} 
            onChange={(e) => setTaskName(e.target.value)} 
            className="px-4 py-2 border border-gray-500 rounded"
          />
          <input 
            type="number" 
            placeholder="Time in seconds" 
            value={taskTime} 
            onChange={(e) => setTaskTime(Number(e.target.value))} 
            className="px-4 py-2 border border-gray-500 rounded"
          />
          <button 
            type="submit" 
            className="px-4 py-2 bg-gray-700 text-white rounded-full"
          >
            Add
          </button>
        </form>
      )}
      <ul className="mt-4">
        {timers.map((timer, index) => (
          <li key={index} className="text-white cursor-pointer" onClick={() => handleTimerClick(index)}>
            {timer.title}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default App
