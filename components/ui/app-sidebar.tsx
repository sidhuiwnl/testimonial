"use client"

import {
  Calendar,
  ChevronUp,
  Home,
  Inbox,
  Search,
  Settings,
  BeerIcon,
} from "lucide-react";
import { useSession } from "@/app/lib/auth-client";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import Image from "next/image";
import SignOut from "../Signout";


const items = [
  {
    title: "Import Review",
    url: "/dashboard/import",
    icon: Home,
  },
  {
    title: "My Reviews",
    url: "/dashboard/reviews",
    icon: Inbox,
  },
  {
    title: "Wall of Fame",
    url: "/dashboard/walloffame",
    icon: Calendar,
  },
  {
    title: "Api Key",
    url: "#",
    icon: Search,
  },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
];

export function AppSidebar() {
  const session = useSession();
  const user = session.data?.user
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="underline text-black mt-2 mb-3">
            <BeerIcon className="mr-2 " />
            Testimonial
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Image
                    src={user?.image || ""}
                    width={30}
                    height={30}
                    alt={user?.name || ""}
                    className="rounded-full "
                  />
                  {user?.name}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOut/>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
