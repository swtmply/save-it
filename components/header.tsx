"use client";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <div className="flex w-full px-2 lg:px-0 justify-between py-4">
      <div className="flex items-center gap-3">
        <Image
          src="/saveit-logo.svg"
          height={28}
          width={22}
          alt="save it logo"
        />
        <h1 className="font-semibold tracking-tight text-xl">Save It</h1>
      </div>
      <div className="flex items-center text-sm text-slate-500 gap-4">
        <Link
          href="/"
          className={cn(pathname === "/" && "text-slate-900 font-semibold")}
        >
          Home
        </Link>
        <Link
          href="/accounts"
          className={cn(
            pathname === "/accounts" && "text-slate-900 font-semibold"
          )}
        >
          Accounts
        </Link>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </div>
  );
};

export default Header;
