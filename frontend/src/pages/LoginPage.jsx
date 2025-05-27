import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await axios.post("http://localhost:4000/api/login", { username, password });
      localStorage.setItem("pertech_user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (error) {
      setErr(error?.response?.data?.error || "خطا در ورود");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dbeafe] via-[#f3e8ff] to-[#f0f4ff]">
      <div className="w-full max-w-md bg-white/95 rounded-3xl shadow-2xl border border-[#e7e3fa] p-8 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-br from-blue-300 to-purple-300 opacity-30 blur-2xl animate-pulse"></div>
        <h2 className="text-3xl font-extrabold text-primary text-center mb-6 drop-shadow">ورود به PerTech</h2>
        <form onSubmit={handleLogin} className="space-y-5 z-10 relative">
          <div>
            <label className="block mb-1 font-medium">نام کاربری</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">رمز عبور</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {err && <div className="mb-2 text-red-500 text-center text-sm">{err}</div>}
          <button
            type="submit"
            className="btn-primary w-full text-lg"
          >
            ورود
          </button>
          <div className="text-center mt-4">
            <span>حساب شرکتی ندارید؟ </span>
            <Link to="/register" className="text-primary font-bold hover:underline">ثبت‌نام شرکت</Link>
          </div>
        </form>
      </div>
    </div>
  );
}