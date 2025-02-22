import './App.css';
import Timer from './components/Timer';

import { Timer as TimerType, useTimerContext } from './Context';
import { useState } from 'react';
import { Drawer } from 'vaul';

const App = () => {
  const { timers, addTimer, deleteTimer } = useTimerContext();
  const [activeTimer, setActiveTimer] = useState<TimerType | null>(null);
  const [taskName, setTaskName] = useState('');
  const [taskTime, setTaskTime] = useState(0);
  const [openForm, setOpenForm] = useState(false);

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
    setOpenForm(false);
  };

  return (
    <main className="bg-black flex flex-col justify-center items-center h-full min-h-screen">
      <Timer
        activeTimer={activeTimer?.id ?? ''}
        timerTitle={activeTimer?.title ?? ''}
        startTime={activeTimer?.seconds ?? 0}
      />
      <div className="mt-4 flex items-center w-full max-w-sm">
        <span className="uppercase text-gray-500 text-sm">Next Up</span>
        <span className="mx-2 border-b border-gray-500 flex-grow"></span>
        <button
          className=""
        >
          <Drawer.Root open={openForm} onOpenChange={setOpenForm}>
            <Drawer.Trigger className="border-none text-gray-500 hover:text-white transition flex items-center p-1 text-2xl">
              <ion-icon name="add-circle-outline" />
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
                <div className="p-4 bg-gray-900 rounded-t-[10px] flex-1">
                  <div
                    aria-hidden
                    className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"
                  />
                  <div className="max-w-md mx-auto">
                    <Drawer.Title className="font-medium mb-4 text-white font-bold">
                      Add Timer
                    </Drawer.Title>
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
                        className="border-none bg-transparent text-gray-500 hover:text-white transition p-1 text-3xl"
                      >
                        <ion-icon name="arrow-forward-circle-sharp" />
                      </button>
                    </form>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </button>
      </div>
      <ul className="task-list mt-4 w-full max-w-sm flex flex-col space-y-2">
        {timers.map(timer => (
            <li
            key={timer.id}
            className={`mr-2 flex justify-between items-start w-full transition duration-150 ease-in-out cursor-pointer ${activeTimer?.id === timer.id ? 'underline text-white' : 'text-gray-500 hover:text-white'}`}
            onClick={() => handleTimerClick(timer.id)}
            >
            <span>{timer.title}</span>
            <div className="flex items-center gap-2">
              <span className="mx-1">
              {Math.floor(timer.seconds / 60)}m {timer.seconds % 60}s
              </span>
              <button
              onClick={e => {
                e.stopPropagation();
                deleteTimer(timer.id);
              }}
              className="border-none bg-transparent text-gray-700 hover:text-red-500 transition p-1 delete-task inline-flex items-center mr-1"
              >
              <ion-icon name="trash-bin-sharp" />
              </button>
            </div>
            </li>
        ))}
      </ul>
    </main>
  );
};

export default App;
