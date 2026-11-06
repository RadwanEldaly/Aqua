import { fontArabic, fontSans } from "@/styles/fonts";
import "@/app/globals.css";

export default function RootNotFound() {
  return (
    <html lang="ar" dir="rtl" className={`${fontArabic.variable} ${fontSans.variable}`}>
      <body className="min-h-screen flex items-center justify-center bg-canvas text-brand-deep">
        <div className="text-center p-6">
          <h1 className="text-4xl font-bold text-brand-primary">404</h1>
          <p className="mt-2 text-text-muted">الصفحة غير موجودة / Page Not Found</p>
        </div>
      </body>
    </html>
  );
}
