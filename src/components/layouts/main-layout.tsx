import { useAppStore } from "@/store/useApp";
import { Outlet } from "react-router";
import { AppSidebar } from "../app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Separator } from "../ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { ThemeModeToggle } from "../theme-mode-toggle";

export default function MainLayout() {
  const { activeNav } = useAppStore();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-1 bg-sidebar flex px-4 h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" />
            <Breadcrumb>
              <BreadcrumbList>
                {activeNav?.parent && (
                  <BreadcrumbItem>{activeNav.parent.title}</BreadcrumbItem>
                )}
                {activeNav?.children && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>{activeNav.children.title}</BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <ThemeModeToggle />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
