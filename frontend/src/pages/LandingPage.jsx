import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-[#f0f4ff] via-[#e7d0ff] to-[#f7e1ff]">
      <header className="w-full px-8 py-5 flex justify-between items-center bg-white/70 shadow-lg z-10 backdrop-blur">
        <h1 className="text-3xl font-extrabold text-primary drop-shadow">
          <span className="text-secondary">PerTech</span> حسابداری ابری
        </h1>
        <nav>
          <Link to="/login" className="px-6 py-2 rounded-full font-bold text-blue-700 border-2 border-blue-700 bg-white hover:bg-blue-700 hover:text-white transition duration-150 ml-2">ورود</Link>
          <Link to="/register" className="px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200">ثبت‌نام شرکت</Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col-reverse md:flex-row items-center justify-center px-8 py-12">
        <section className="flex-1 flex flex-col items-center md:items-end md:pr-12 space-y-6">
          <h2 className="text-5xl font-black text-primary text-end leading-tight drop-shadow-lg">
            آینده حسابداری<br />
            <span className="text-secondary">هوشمند و امن</span>
          </h2>
          <p className="text-xl text-gray-700 text-end max-w-xl">
            هر شرکت دیتابیس اختصاصی!<br />
            مدیریت کامل محصولات، فروش، کاربران و گزارش‌ها.<br />
            امنیت بالا، رابط کاربری فارسی و دسترسی ابری.
          </p>
          <Link to="/register" className="px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 text-lg w-fit">شروع رایگان</Link>
        </section>
        <section className="flex-1 flex items-center justify-center mb-8 md:mb-0">
          <div className="relative">
            <img
              src="https://assets-global.website-files.com/61e6e8ac4a52463b3b5d8fdb/63fbf35f3b7f5dbe874f1c20_dashboard-2-crypto-template.png"
              alt="داشبورد حسابداری"
              className="rounded-2xl shadow-2xl border-4 border-white w-[420px] max-w-full"
            />
            <div className="absolute -left-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400 to-purple-300 blur-2xl opacity-30 animate-pulse"></div>
          </div>
        </section>
      </main>
      <footer className="text-center text-gray-400 py-6 bg-white/50 backdrop-blur border-t border-[#e7e3fa] mt-8">
        © {new Date().getFullYear()} PerTech | توسعه داده شده با ❤️ توسط تیم شما
      </footer>
    </div>
  );
}