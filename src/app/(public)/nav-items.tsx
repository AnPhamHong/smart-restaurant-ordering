"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const menuItems = [
  {
    title: "Menu",
    href: "/menu",
    authRequired: true,
  },
  {
    title: "Orders",
    href: "/orders",
    authRequired: true,
  },
  {
    title: "Management",
    href: "/manage/dashboard",
    authRequired: true,
  },
  {
    title: "Sign in",
    href: "/sign-in",
    authRequired: false,
  },
];

export default function NavItems({ className }: { className?: string }) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuth(Boolean(token));
  }, []);

  if (isAuth === null) return null;

  return menuItems.map((item) => {
    if ((!item.authRequired && isAuth) || (item.authRequired && !isAuth))
      return null;
    return (
      <Link href={item.href} key={item.href} className={className}>
        {item.title}
      </Link>
    );
  });
}
