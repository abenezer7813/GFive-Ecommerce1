// app/admin/layout.tsx
import Sidesbar from "@/components/admin/Sidesbar";
import Topbar from "@/components/admin/Topbar";
import type { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">

{/*sidebar*/}
<Sidesbar/>
      <div className="flex-1">
{/*topbar*/}
<Topbar/>
        <main className="ml-64 flex-1 min-h-screen bg-gray-100 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
