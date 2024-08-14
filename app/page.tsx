'use client'


import { useState, useEffect, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';

export default function Home() {

  const [taskTitle, setTaskTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [tasks, setTasks] = useState<any[]>([]);
  // Load tasks from localStorage on the client side
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (taskTitle && selectedDate) {
      const newTask = {
        title: taskTitle,
        date: format(selectedDate, 'PPPP'),
        time: selectedTime,
      };
      setTasks([...tasks, newTask]);
      setTaskTitle('');
      setSelectedDate(undefined); // Updated from null to undefined for TypeScript compatibility
      setSelectedTime('');
    }
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_: any, i: number) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index: number) => {
    const taskToEdit = tasks[index];
    setTaskTitle(taskToEdit.title);
    setSelectedDate(new Date(taskToEdit.date)); // Ensure this parses correctly
    setSelectedTime(taskToEdit.time);
    deleteTask(index);
  };

  

  return (
    <div className="flex flex-col h-full w-full bg-muted/40">
      <header className="sticky top-0 z-30 flex items-center gap-4 border-b bg-background px-4 py-3 sm:px-6">
        <h1 className="text-xl font-semibold">Weekly Planner</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            <CalendarIcon className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Monthly View</span>
          </Button>
          <Button variant="outline" size="sm">
            <ListIcon className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">List View</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 grid grid-cols-1 gap-4 p-4 sm:grid-cols-[1fr_300px] sm:p-6">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-4">
                {/* Render Week Days */}
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div className="font-semibold">{day}</div>
                    <div className="text-2xl font-bold">{16 + index}</div> {/* Replace with dynamic date */}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Add New Task</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={addTask} className="grid gap-4">
                <Input
                  placeholder="Task Title"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start">
                        <CalendarDaysIcon className="mr-2 h-4 w-4" />
                        <span>
                          {selectedDate && !isNaN(selectedDate.getTime())
                            ? format(selectedDate, "MMM dd, yyyy")
                            : "Select Date"}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Calendar initialFocus mode="single" selected={selectedDate} onSelect={setSelectedDate} />
                    </PopoverContent>
                  </Popover>
                  <Input
                    placeholder="Select Time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    type="time"
                  />
                </div>
                <Button type="submit">Add Task</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {tasks.map((task: { title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; date: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; time: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, index: number) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="font-semibold">{task.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {task.date} at {task.time}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => editTask(index)}>
                      <FilePenIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => deleteTask(index)}>
                      <Trash2Icon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                ))}
              </div>

            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function CalendarDaysIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}


function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


function FilePenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  )
}


function ListIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  )
}


function Trash2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  )
}
