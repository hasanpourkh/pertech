import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [companyName, setCompanyName] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValid =
    companyName.length > 2 && adminUsername.length > 2 && adminPassword.length > 4;

  async function handleRegister(e) {
    e.preventDefault();
    setErr("");
    setSuccess("");
    setLoading(true);
    try {
      // جایگزین با آدرس واقعی API ثبت‌نام
      const res = await axios.post("http://localhost:4000/api/register-company", {
        companyName,
        adminUsername,
        adminPassword,
      });
      setSuccess("ثبت‌نام با موفقیت انجام شد! حالا وارد شوید.");
      setTimeout(() => navigate("/login"), 1800);
    } catch (error) {
      setErr(error?.response?.data?.error || "خطا در ثبت‌نام شرکت");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-[#f3e8ff] via-[#dbeafe] to-[#f0f4ff]">
      <div className="w-full max-w-lg bg-white/95 rounded-3xl shadow-glass border border-[#e7e3fa] p-8 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-12 w-48 h-48 rounded-full bg-gradient-to-tr from-primary to-secondary opacity-30 blur-2xl animate-pulse"></div>
        <h2 className="text-2xl font-extrabold text-secondary text-center mb-6 drop-shadow">ثبت‌نام شرکت جدید</h2>
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
              minLength={3}
              placeholder="مثلاً فروشگاه آریا"
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
              minLength={3}
              placeholder="مثلاً admin"
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
              minLength={5}
              placeholder="حداقل ۵ کاراکتر"
            />
          </div>
          {err && <div className="mb-2 text-red-500 text-center text-sm animate-shake">{err}</div>}
          {success && <div className="mb-2 text-green-600 text-center text-sm animate-fade-in">{success}</div>}
          <button
            type="submit"
            className={`w-full py-3 rounded-full font-bold text-white bg-gradient-to-r from-secondary to-primary shadow-lg transition-all duration-200 text-lg
              ${isValid && !loading ? "hover:scale-105 hover:shadow-xl" : "opacity-50 cursor-not-allowed"}`}
            disabled={!isValid || loading}
          >
            {loading ? "درحال ثبت‌نام..." : "ثبت‌نام شرکت"}
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