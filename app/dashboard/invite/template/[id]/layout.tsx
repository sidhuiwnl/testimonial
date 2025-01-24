import { TemplateSidebar } from "@/app/dashboard/invite/template/[id]/page";
import BreadcrumbComp from "@/components/Crumbs";
import {SidebarProvider} from "@/components/ui/sidebar";

export default function TemplateLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-full h-screen overflow-hidden">
            <SidebarProvider>
                <TemplateSidebar />
                <div className="flex-1 flex flex-col">
                    <BreadcrumbComp/>
                    <main>{children}</main>
                </div>
            </SidebarProvider>

        </div>
    );
}