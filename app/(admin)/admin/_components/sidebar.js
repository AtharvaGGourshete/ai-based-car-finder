"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Car, Calendar, Cog, LogOut, RouteIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/nextjs";

const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
    },
    {
      label: "Cars",
      icon: Car,
      href: "/admin/cars",
    },
    {
      label: "Test Drives",
      icon: Calendar,
      href: "/admin/test-drives",
    },
    {
      label: "Settings",
      icon: Cog,
      href: "/admin/settings",
    },
  ];

const Sidebar = () => {
  return (
    <>
    <div>
        {routes.map((route) => {
            return (
                <Link key={route.href} href={route.href}>
                    <route.icon className="w-5 h-5"/>
                    {route.label}
                </Link>
            )
        })}
    </div>
    </>
  )
}

export default Sidebar