import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-pink-50">
      <header className="w-full px-6 py-4 flex justify-between items-center bg-white/80 shadow-md">
        <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight">
          <span className="text-purple-700">PerTech</span> حسابداری حرفه‌ای
        </h1>
        <div>
          <Link to="/login" className="px-5 py-2 text-blue-700 hover:text-white border-2 border-blue-700 rounded-full font-bold mr-2 hover:bg-blue-700 transition">
            ورود
          </Link>
          <Link to="/register" className="px-5 py-2 text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold hover:scale-105 transition">
            ثبت‌نام شرکت
          </Link>
        </div>
      </header>
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center py-20 px-8">
        <section className="flex-1 flex flex-col items-start md:items-end md:pr-12 mb-8 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight text-end">
            حسابداری آسان و <span className="text-purple-600">هوشمند</span> <br />
            برای <span className="text-blue-700">شرکت‌ها</span> و <span className="text-pink-600">کسب‌وکارها</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 text-end">
            با PerTech هر شرکت دیتابیس جداگانه و امنیت اطلاعات! <br />
            مدیریت محصولات، فروش، کاربران و گزارش‌های پیشرفته فقط با چند کلیک.
          </p>
          <Link to="/register" className="px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition text-lg">
            همین حالا شروع کنید
          </Link>
        </section>
        <section className="flex-1 flex justify-center items-center">
          <img
            src="https://cdn.dribbble.com/users/2005975/screenshots/15118162/media/0e2e7f67f08a7e399e9b8ed6d8f7cdbf.png"
            alt="حسابداری مدرن"
            className="rounded-3xl shadow-2xl w-96 max-w-full"
          />
        </section>
      </main>
      <footer className="text-center text-gray-400 py-4 bg-white/60">
        © {new Date().getFullYear()} PerTech | توسعه توسط تیم شما
      </footer>
    </div>
  );
}