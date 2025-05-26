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
      setTimeout(() => navigate("/login"), 1800);
    } catch (error) {
      setErr(error?.response?.data?.error || "خطا در ثبت‌نام شرکت");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-50">
      <form onSubmit={handleRegister} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-8">ثبت‌نام شرکت جدید</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">نام شرکت</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">نام کاربری مدیر</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={adminUsername}
            onChange={e => setAdminUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">رمز عبور مدیر</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={adminPassword}
            onChange={e => setAdminPassword(e.target.value)}
            required
          />
        </div>
        {err && <div className="mb-4 text-red-500 text-sm">{err}</div>}
        {success && <div className="mb-4 text-green-600 text-sm">{success}</div>}
        <button
          type="submit"
          className="w-full py-2 rounded bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:scale-105 transition"
        >
          ثبت‌نام شرکت
        </button>
        <div className="text-center mt-4">
          <span>حساب کاربری دارید؟ </span>
          <Link to="/login" className="text-purple-700 font-bold hover:underline">ورود</Link>
        </div>
      </form>
    </div>
  );
}