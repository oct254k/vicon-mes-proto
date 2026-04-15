"use client";

import Link from "next/link";
import Image from "next/image";

export function TopNav() {
  return (
    <nav className="fixed top-0 flex justify-between items-center w-full px-10 h-16 z-50 bg-surface border-b border-surface-container-highest/20">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image
            src="/vicon_logo.png"
            alt="VICON Logo"
            width={120}
            height={35}
            className="h-8 w-auto invert-0"
            priority
          />
        </Link>
        <div className="hidden md:flex gap-6 font-headline font-bold tracking-tighter tabular-nums">
          <Link href="/dashboard" className="text-on-surface opacity-70 hover:opacity-100 hover:bg-surface-container-highest transition-colors duration-150 py-1 px-2">
            대시보드
          </Link>
          <Link href="/trace" className="text-on-surface opacity-70 hover:opacity-100 hover:bg-surface-container-highest transition-colors duration-150 py-1 px-2">
            이력추적
          </Link>
          <Link href="/alarm" className="text-on-surface opacity-70 hover:opacity-100 hover:bg-surface-container-highest transition-colors duration-150 py-1 px-2">
            알람
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <span className="material-symbols-outlined text-on-surface cursor-pointer hover:text-primary-accent">
          notifications
        </span>
        <span className="material-symbols-outlined text-on-surface cursor-pointer hover:text-primary-accent">
          settings
        </span>
        <div className="w-8 h-8 bg-surface-container-highest flex items-center justify-center border border-outline-variant/20">
          <span className="material-symbols-outlined text-sm">person</span>
        </div>
      </div>
    </nav>
  );
}
