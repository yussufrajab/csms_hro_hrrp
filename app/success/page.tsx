"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md border border-white/50 animate-fade-in">
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-2xl" />

        <div className="p-6 sm:p-10">
          {/* Header with logo */}
          <div className="flex flex-col items-center mb-6">
            <img
              src="/logo_smz.webp"
              alt="Logo"
              className="w-20 h-20 object-contain mb-4 rounded-lg"
            />
            <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent tracking-wide">
              Congratulations!
            </h1>
            <p className="text-muted-foreground text-center mt-2 text-sm">
              Registration successful
            </p>
          </div>

          {/* Return button */}
          <Link
            href="/"
            className="block w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/25 rounded-xl uppercase tracking-wider font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-center flex items-center justify-center"
          >
            Return to Registration
          </Link>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-xs">
              Registration System • Zanzibar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}