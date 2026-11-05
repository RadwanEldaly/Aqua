import { fontArabic, fontSans } from "@/styles/fonts";
import "@/app/globals.css";

export default function RootNotFound() {
  return (
    <html lang="ar" dir="rtl" className={`${fontArabic.variable} ${fontSans.variable}`}>
      <body className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800">
        <div className="text-center p-6">
          <h1 className="text-4xl font-bold text-sky-600">404</h1>
          <p className="mt-2 text-slate-600">الصفحة غير موجودة / Page Not Found</p>
        </div>
      </body>
    </html>
  );
}
