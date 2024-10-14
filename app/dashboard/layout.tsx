import Sidebar from "@/components/Dashboard";
import BreadcrumbComp from "@/components/Crumbs";
import { validateRequest } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { user } = await validateRequest();
  return (
    <div className="flex w-full h-screen">
      <Sidebar username={user?.username} avatar_url={user?.avatar_url} />
      <div className="flex flex-col flex-grow">
        <div className="sticky top-0 z-10">
          <BreadcrumbComp />
        </div>
        <div className="flex-grow p-6 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
