import React,{useState,useEffect} from 'react';
import './TaskTracker.css'

function TaskTracker(){
    const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObject = {
        id: Math.floor(Math.random() * 10000), // Temporary ID until backend integration
        title: newTask,
        completed: false
      };

      setTasks([ newTaskObject,...tasks]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'incomplete' && !task.completed));

  return (
    <div className="App">
        <div className='stick'>
            <h1>Task Tracker</h1>
            <input className='inputtxt'
              type="text"
              placeholder="Enter Task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />&nbsp;
            <button onClick={addTask} className='add'>Add Task</button>
        </div>
        <div className='filters'>
            <div className='filter'>
              <label>Filter Tasks:</label>
              <select onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </div>
            <div className="task-list">
              {filteredTasks.map(task => (
                <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
                    <span>{task.title}</span>
                    <div className='buttons'>
                        <button onClick={() => deleteTask(task.id)} className='btn1'>Delete</button>&nbsp;&nbsp;&nbsp;
                        <button onClick={() => toggleTaskCompletion(task.id)} className='btn2'>
                          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                        </button>
                    </div>
                </div>
              ))}
            </div>
        </div>
    </div>
  );
}


export default TaskTracker;