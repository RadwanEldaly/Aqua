import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const tNav = useTranslations("Navigation");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-center">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center gap-4">
        <span className="text-5xl font-black text-sky-600">404</span>
        <p className="text-slate-600 text-sm font-medium">
          The requested page could not be found.
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center px-4 py-2 rounded-lg bg-sky-600 text-white text-xs font-semibold hover:bg-sky-700 transition-colors"
        >
          {tNav("home")}
        </Link>
      </div>
    </main>
  );
}
