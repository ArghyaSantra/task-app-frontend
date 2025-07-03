import { useEffect, useState } from "react";
import axios from "./axiosInstance";
import { useAuth } from "./AuthContext";
import LoginForm from "./components/LoginForm";
import ImageUpload from "./components/ImageUpload";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    console.log({ API_URL });
    const { data } = await axios.get(`${API_URL}/tasks`);
    console.log({ data });
    setTasks(data);
  };

  const addTask = async () => {
    if (!title) return;
    await axios.post(`${API_URL}/tasks`, { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/tasks/${id}`);
    fetchTasks();
  };

  const { token, user, logout } = useAuth();

  if (!token) return <LoginForm />;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={logout}>Logout</button>
      <h1>Task Manager + Image Upload</h1>
      <ImageUpload />
      <h1>Welcome, {user?.username}</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add task"
      />
      <button onClick={addTask}>Add</button>
      {/* <img src="https://res.cloudinary.com/dgi3xk7ns/image/upload/v1751562039/vbago0ykhujopgrnzet7.png" /> */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
