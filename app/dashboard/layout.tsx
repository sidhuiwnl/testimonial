import Sidebar from "@/components/Dashboard";
import BreadcrumbComp from "@/components/Crumbs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <div className="sticky top-0 z-10">
          <BreadcrumbComp />
        </div>
        <div className="flex-grow p-6 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
