import { useState } from "react";
import axios from "../axiosInstance";
import { useAuth } from "../AuthContext";

type FormState = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { login } = useAuth();
  const [form, setForm] = useState<FormState>({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/login", form);
      login(data.token, data.user);
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
