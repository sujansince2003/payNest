import React from "react";
import { SidebarItem } from "../../components/SidebarItems";
import { LayoutDashboard, Send, Scroll } from "lucide-react";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
        <div>
          <SidebarItem
            href={"/dashboard"}
            icon={<LayoutDashboard />}
            title="Home"
          />
          <SidebarItem href={"/transfer"} icon={<Send />} title="Transfer" />
          <SidebarItem
            href={"/transactions"}
            icon={<Scroll />}
            title="Transactions"
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default layout;
