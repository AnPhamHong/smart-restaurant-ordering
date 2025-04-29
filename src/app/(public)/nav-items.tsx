"use client";

import Link from "next/link";

const menuItems = [
  {
    title: "Menu",
    href: "/menu",
  },
  {
    title: "Orders",
    href: "/orders",
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
  return menuItems.map((item) => {
    return (
      <Link href={item.href} key={item.href} className={className}>
        {item.title}
      </Link>
    );
  });
}
