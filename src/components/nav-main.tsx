import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useAppStore } from "@/store/useApp";
import type { NavItem } from "@/types";
import { ChevronRightIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Fragment } from "react/jsx-runtime";

export function NavMain({ items }: { items: NavItem[] }) {
  const { activeNav } = useAppStore();
  const navigate = useNavigate();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Fragment key={item.title}>
            {item.items ? (
              <Collapsible
                asChild
                defaultOpen={activeNav?.parent?.url == item.url}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={activeNav?.parent?.url == item.url}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                      <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={activeNav?.children?.url == subItem.url}
                            onClick={() => navigate(item.url)}
                          >
                            <Link to={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuButton
                tooltip={item.title}
                isActive={activeNav?.parent?.url == item.url}
                onClick={() => navigate(item.url)}
              >
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            )}
          </Fragment>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
