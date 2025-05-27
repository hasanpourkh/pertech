import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [companyName, setCompanyName] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr("");
    setSuccess("");
    try {
      const res = await axios.post("http://localhost:4000/api/register-company", {
        companyName,
        adminUsername,
        adminPassword,
      });
      setSuccess("ثبت‌نام با موفقیت انجام شد! حالا وارد شوید.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setErr(error?.response?.data?.error || "خطا در ثبت‌نام شرکت");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-[#f3e8ff] via-[#dbeafe] to-[#f0f4ff]">
      <div className="w-full max-w-lg bg-white/95 rounded-3xl shadow-2xl border border-[#e7e3fa] p-8 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-12 w-48 h-48 rounded-full bg-gradient-to-tr from-purple-200 to-blue-200 opacity-30 blur-2xl animate-pulse"></div>
        <h2 className="text-3xl font-extrabold text-secondary text-center mb-6 drop-shadow">ثبت‌نام شرکت جدید</h2>
        <form onSubmit={handleRegister} className="space-y-5 z-10 relative">
          <div>
            <label className="block mb-1 font-medium">نام شرکت</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">نام کاربری مدیر</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition"
              value={adminUsername}
              onChange={e => setAdminUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">رمز عبور مدیر</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition"
              value={adminPassword}
              onChange={e => setAdminPassword(e.target.value)}
              required
            />
          </div>
          {err && <div className="mb-2 text-red-500 text-center text-sm">{err}</div>}
          {success && <div className="mb-2 text-green-600 text-center text-sm">{success}</div>}
          <button
            type="submit"
            className="btn-primary w-full text-lg"
          >
            ثبت‌نام شرکت
          </button>
          <div className="text-center mt-4">
            <span>حساب کاربری دارید؟ </span>
            <Link to="/login" className="text-secondary font-bold hover:underline">ورود</Link>
          </div>
        </form>
      </div>
    </div>
  );
}