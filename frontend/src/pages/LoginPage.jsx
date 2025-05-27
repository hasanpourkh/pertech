import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValid = username.length > 2 && password.length > 4;

  async function handleLogin(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      // جایگزین با آدرس واقعی API
      const res = await axios.post("http://localhost:4000/api/login", { username, password });
      localStorage.setItem("pertech_user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (error) {
      setErr(error?.response?.data?.error || "نام کاربری یا رمز عبور اشتباه است.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dbeafe] via-[#f3e8ff] to-[#f0f4ff]">
      <div className="w-full max-w-md bg-white/90 rounded-3xl shadow-glass border border-[#e7e3fa] p-8 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-br from-sky-300 to-primary opacity-30 blur-2xl animate-pulse"></div>
        <h2 className="text-2xl font-extrabold text-primary text-center mb-6 drop-shadow">ورود به پنل PerTech</h2>
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
              minLength={3}
              placeholder="مثلاً admin"
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
              minLength={5}
              placeholder="حداقل ۵ کاراکتر"
            />
          </div>
          {err && <div className="mb-2 text-red-500 text-center text-sm animate-shake">{err}</div>}
          <button
            type="submit"
            className={`w-full py-3 rounded-full font-bold text-white bg-gradient-to-r from-primary to-secondary shadow-lg transition-all duration-200 text-lg
              ${isValid && !loading ? "hover:scale-105 hover:shadow-xl" : "opacity-60 cursor-not-allowed"}`}
            disabled={!isValid || loading}
          >
            {loading ? "درحال ورود..." : "ورود"}
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