import { notFound } from "next/navigation";

import { getAdmin } from "@/actions/admin";

import Sidebar from "./_components/sidebar";
import Header from "@/components/Header";

export default async function AdminLayout({ children }) {
  const admin = await getAdmin();

  // If user not found in our db or not an admin, redirect to 404
  if (!admin.authorized) {
    return notFound();
  }

  return (
    <div className="h-full">
      <Header isAdminPage={true} />
      <div className="flex h-full w-56 flex-col top-20 fixed inset-y-0 z-50">
        <Sidebar/>
      </div>
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  );
} 