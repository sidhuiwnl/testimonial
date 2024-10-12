'use client'

import React, { ReactNode } from "react";
import {
  MessageCircle,
  Mail,
  ImportIcon,
  Heart,
  Star,
  ArrowRight,
  Key,
  LucideIcon,
  Beer,
} from "lucide-react";
import Image from "next/image";
import vagabond from "@/public/vagabond.jpg";
;
import Link from "next/link";


interface SidebarItemProps {
  icon: LucideIcon;
  text: ReactNode;
  isNew?: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  text,
  isNew,
  href,
}) => (
    <Link href={href} className="block">
    <div className="flex items-center space-x-2 py-2 px-4 hover:bg-zinc-100 hover:rounded-sm hover:mr-2 cursor-pointer">
      <Icon className="w-5 h-5 text-gray-700" />
      <span className="text-sm text-slate-600 font-medium antialiased flex-1">{text}</span>
      {isNew && (
        <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-sm font-medium">
          New 🎉
        </span>
      )}
    </div>
  </Link>
  
);

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, children }) => (
  <div className="mb-10 ml-7">
    <h3 className="text-xs font-semibold text-zinc-500 antialiased px-4 mb-2">
      {title}
    </h3>
    {children}
  </div>
);

const Sidebar: React.FC = () => {
  
  
  return (
    <div className="w-[400px] bg-white h-screen border-r border-gray-200 flex flex-col">
      <div className="p-4 flex items-center space-x-3 border-b mb-4">
        <div className="w-9 h-9 ml-7 bg-teal-500 rounded-full flex justify-center items-center">
          <Beer className="text-white" />
        </div>
        <div>
          <h2 className="font-semibold text-sm text-gray-700 antialiased">
            Testimonial
          </h2>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto">
        <SidebarSection title="Collect">
          <SidebarItem icon={MessageCircle} text={<span className="font-semibold text-sm text-zinc-600 leading-6 antialiased">Collection Page</span>} href="/collection" />
          <SidebarItem icon={Mail} text={<span className="font-semibold text-sm text-zinc-600 antialiased">Automated Emails</span>} isNew href="/automated-emails" />
          <SidebarItem icon={ImportIcon} text={<span className="font-semibold text-sm text-zinc-600 antialiased">Import Review</span>} isNew href="/dashboard/import" />
        </SidebarSection>

        <SidebarSection title="Manage">
          <SidebarItem icon={Heart} text={<span className="font-semibold text-sm text-zinc-600 antialiased">My reviews</span>} href="/my-reviews" />
        </SidebarSection>

        <SidebarSection title="Export">
          <SidebarItem icon={Star} text={<span className="font-semibold text-sm text-zinc-700 antialiased">Wall of Love</span>} isNew href="/wall-of-love" />
          <SidebarItem icon={ArrowRight} text={<span className="font-semibold text-sm text-zinc-700 antialiased disabled:opacity-75">Single Review</span>} href="/single-review" />
        </SidebarSection>

        <SidebarSection title="Automation">
          <SidebarItem icon={Key} text={<span className="font-semibold text-sm text-zinc-600 antialiased">API Key</span>} href="/api-key" />
        </SidebarSection>
      </div>

      <div className="p-4  border-t border-gray-200 flex items-center space-x-2">
        <Image
          src={vagabond}
          width={20}
          height={20}
          className="rounded-full ml-7"
          alt="avatar"
        />
        <span className="text-sm text-gray-800 font-medium antialiased">Sidharth babu</span>
      </div>
     
    </div>
  );
};

export default Sidebar;