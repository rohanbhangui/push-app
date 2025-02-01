import './App.css';
import Timer from './components/Timer';

import { Timer as TimerType, useTimerContext } from './Context';
import { useState } from 'react';

const App = () => {
  const { timers, addTimer, deleteTimer } = useTimerContext();
  const [activeTimer, setActiveTimer] = useState<TimerType | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskTime, setTaskTime] = useState(0);

  const handleTimerClick = (id: string) => {
    const timer = timers.find(item => item.id === id);
    if (timer) {
      setActiveTimer(timer);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTimer({ title: taskName, seconds: taskTime });
    setTaskName('');
    setTaskTime(0);
    setShowForm(false);
  };

  return (
    <main className="bg-black flex flex-col justify-center items-center h-full min-h-screen">
      <Timer
        activeTimer={activeTimer !== null ? activeTimer.id : ''}
        timerTitle={activeTimer !== null ? activeTimer.title : ''}
        startTime={activeTimer !== null ? activeTimer.seconds : 900}
      />
      <div className="mt-4 flex items-center w-full max-w-sm">
        <span className="uppercase text-gray-500 text-sm">Next Up</span>
        <span className="mx-2 border-b border-gray-500 flex-grow"></span>
        <button
          onClick={() => setShowForm(true)}
          className="border-none text-gray-500 hover:text-white transition flex items-center p-1 text-2xl"
        >
          <ion-icon name="add-circle-outline"></ion-icon>
        </button>
      </div>
      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="mt-4 w-full max-w-sm flex justify-between items-center space-x-2"
        >
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
            className="flex-grow border-b border-gray-500 focus:border-white transition-colors duration-300 py-2"
            autoFocus
          />
          <input
            type="number"
            placeholder="Time in seconds"
            value={taskTime}
            onChange={e => setTaskTime(Number(e.target.value))}
            max={5999}
            className="w-24 border-b border-gray-500 text-right focus:border-white transition-colors duration-300 py-2"
          />
          <button
            type="submit"
            className="border-none bg-transparent text-gray-500 hover:text-white transition p-1 text-2xl"
          >
            <ion-icon name="checkmark-circle-sharp"></ion-icon>
          </button>
        </form>
      )}
      <ul className="task-list mt-4 w-full max-w-sm flex flex-col space-y-2">
        {timers.map(timer => (
          <li
            key={timer.id}
            className={`flex justify-between items-start w-full transition duration-150 ease-in-out cursor-pointer ${activeTimer === timer.id ? 'underline text-white' : 'text-gray-500 hover:text-white'}`}
            onClick={() => handleTimerClick(timer.id)}
          >
            <span>{timer.title}</span>
            <div className="flex">
              <span>
                {Math.floor(timer.seconds / 60)}m {timer.seconds % 60}s
              </span>
              <button
                onClick={e => {
                  e.stopPropagation();
                  // Assuming you have a deleteTimer function in your context
                  deleteTimer(timer.id);
                }}
                className="border-none bg-transparent text-gray-500 hover:text-red-500 transition p-1 delete-task inline-flex items-center"
              >
                <ion-icon name="trash-bin-sharp"></ion-icon>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default App;
