import type { ReactElement } from "react";

export const SidebarItem = ({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) => {
  return (
    <div className="flex gap-4  text-2xl items-center p-1">
      <div>{icon}</div>
      <div>{text}</div>
     
    </div>
  );
};
