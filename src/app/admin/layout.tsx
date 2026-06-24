import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin — Content Platform",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#060614]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
