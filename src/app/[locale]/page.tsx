import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import { LabelValue } from "@/components/ui";

export default async function IndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TechnicalFoundationStatus locale={locale} />;
}

function TechnicalFoundationStatus({ locale }: { locale: string }) {
  const tCommon = useTranslations("Common");
  const tStatus = useTranslations("Status");

  const isRtl = locale === "ar";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-sky-50/50 via-slate-50 to-white">
      <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-md rounded-2xl border border-sky-100 shadow-xl shadow-sky-900/5 text-center flex flex-col items-center gap-6">
        {/* Brand Indicator */}
        <div className="flex items-center justify-between w-full border-b border-slate-100 pb-4">
          <div className="text-start">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              {tCommon("brandName")}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              {tCommon("tagline")}
            </p>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Technical Foundation Badge */}
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="w-12 h-12 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100/80 text-sky-800">
            {tStatus("comingSoon")}
          </span>
          <p className="text-sm text-slate-600 font-medium max-w-xs">
            {tStatus("underPreparation")}
          </p>
        </div>

        {/* Technical Diagnostics Summary (Using Direction-Safe LabelValue) */}
        <div className="w-full bg-slate-50 rounded-xl p-4 text-xs text-slate-600 border border-slate-100 space-y-1">
          <LabelValue
            label="Locale / Language"
            value={`${tCommon("localeName")} (${locale})`}
          />
          <LabelValue
            label="Layout Direction"
            value={isRtl ? "RTL (Right to Left)" : "LTR (Left to Right)"}
          />
          <LabelValue
            label="Target Market"
            value={tCommon("shippingLocation")}
          />
          <LabelValue
            label="Payment Model"
            value={tCommon("cod")}
          />
        </div>
      </div>
    </main>
  );
}
