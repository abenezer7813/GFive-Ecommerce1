// app/admin/layout.tsx
import type { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">

{/*sidebar*/}
      <div className="flex-1">
{/*topbar*/}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
