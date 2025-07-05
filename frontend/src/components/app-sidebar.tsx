"use client";
import * as React from "react";
import {
  // BookOpen,
  Brain,
  Home,
  // LifeBuoy,
  // Search,
  // Settings2,
  // Tag,
  // Archive,
  // Star,
} from "lucide-react";

// import { NavProjects } from "@/components/nav-projects";
// import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./main-nav";

const data = {
  user: {
    name: "User",
    email: "user@mindstack.com",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "All Content",
          url: "/dashboard",
        },
        // {
        //   title: "Recent",
        //   url: "/recent",
        // },
        // {
        //   title: "Favorites",
        //   url: "/favorites",
        // },
      ],
    },
    // {
    //   title: "Collections",
    //   url: "#",
    //   icon: Archive,
    //   items: [
    //     {
    //       title: "Articles",
    //       url: "#",
    //     },
    //     {
    //       title: "Videos",
    //       url: "#",
    //     },
    //     {
    //       title: "Documents",
    //       url: "#",
    //     },
    //     {
    //       title: "Links",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Tags",
    //   url: "#",
    //   icon: Tag,
    //   items: [
    //     {
    //       title: "Manage Tags",
    //       url: "#",
    //     },
    //     {
    //       title: "Popular Tags",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "Profile",
    //       url: "#",
    //     },
    //     {
    //       title: "Preferences",
    //       url: "#",
    //     },
    //     {
    //       title: "Import/Export",
    //       url: "#",
    //     },
    //     {
    //       title: "Account",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  // navSecondary: [
  //   {
  //     title: "Support",
  //     url: "#",
  //     icon: LifeBuoy,
  //   },
  //   {
  //     title: "Search",
  //     url: "#",
  //     icon: Search,
  //   },
  // ],
  //   projects: [
  //     {
  //       name: "Work Resources",
  //       url: "#",
  //       icon: BookOpen,
  //     },
  //     {
  //       name: "Learning",
  //       url: "#",
  //       icon: Brain,
  //     },
  //     {
  //       name: "Personal",
  //       url: "#",
  //       icon: Star,
  //     },
  //   ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Brain className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">MindStack</span>
                  <span className="truncate text-xs">Knowledge Hub</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
