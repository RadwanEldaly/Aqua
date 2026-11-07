import React from "react";

export function FacebookIcon({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function XTwitterIcon({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function ThreadsIcon({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M12.186 24c-3.532 0-6.425-1.157-8.368-3.346C1.94 18.536 1 15.547 1 11.83 1 8.167 1.958 5.207 3.847 3.125 5.765 1.01 8.59 0 12.186 0c3.626 0 6.47 1.01 8.452 3.003 1.94 1.951 2.946 4.78 2.99 8.406h-3.17c-.04-2.812-.734-4.887-2.062-6.166-1.408-1.357-3.486-2.046-6.21-2.046-2.793 0-4.945.748-6.395 2.222C4.37 6.862 3.61 8.995 3.61 11.83c0 2.87.75 5.01 2.23 6.46 1.458 1.428 3.58 2.152 6.346 2.152 2.378 0 4.29-.533 5.684-1.583 1.488-1.121 2.316-2.735 2.46-4.795H12.22v-3.13h10.74c.057.48.086 1 .086 1.558 0 3.324-.954 6.09-2.836 8.223C18.318 22.868 15.63 24 12.186 24zm-.036-9.987c-1.393 0-2.52-.375-3.35-1.115-.845-.754-1.274-1.782-1.274-3.056 0-1.294.436-2.341 1.298-3.111.845-.754 1.983-1.137 3.38-1.137 1.428 0 2.58.383 3.424 1.137.86.77 1.297 1.817 1.297 3.111 0 1.274-.43 2.302-1.274 3.056-.845.74-1.996 1.115-3.501 1.115z" />
    </svg>
  );
}

export const SOCIAL_LINKS = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61596223054770&mibextid=ZbWKwL",
    Icon: FacebookIcon,
    colorClass: "hover:bg-[#1877F2]/20 hover:text-[#1877F2] hover:border-[#1877F2]/50",
  },
  {
    id: "threads",
    label: "Threads",
    href: "https://www.threads.com/@aqua.guard9",
    Icon: ThreadsIcon,
    colorClass: "hover:bg-white/20 hover:text-white hover:border-white/50",
  },
  {
    id: "x",
    label: "X (Twitter)",
    href: "https://x.com/aquaguaard99",
    Icon: XTwitterIcon,
    colorClass: "hover:bg-white/20 hover:text-white hover:border-white/50",
  },
] as const;
