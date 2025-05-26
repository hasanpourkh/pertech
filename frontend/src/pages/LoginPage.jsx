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
      // ذخیره اطلاعات کاربر در localStorage (یا کوکی)
      localStorage.setItem("pertech_user", JSON.stringify(res.data.user));
      // به داشبورد یا صفحه شرکت منتقل شود
      navigate("/dashboard");
    } catch (error) {
      setErr(error?.response?.data?.error || "خطا در ورود");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-50">
      <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">ورود به حساب کاربری</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">نام کاربری</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">رمز عبور</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {err && <div className="mb-4 text-red-500 text-sm">{err}</div>}
        <button
          type="submit"
          className="w-full py-2 rounded bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:scale-105 transition"
        >
          ورود
        </button>
        <div className="text-center mt-4">
          <span>حساب شرکتی ندارید؟ </span>
          <Link to="/register" className="text-blue-700 font-bold hover:underline">ثبت‌نام شرکت</Link>
        </div>
      </form>
    </div>
  );
}