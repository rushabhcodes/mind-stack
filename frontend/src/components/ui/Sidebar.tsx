import { TrashIcon } from "../../icons/TrashIcon";
import { TwitterIcon } from "../../icons/Twitter";
import { YoutubeIcon } from "../../icons/Youtube";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
  return (
    <div className="h-screen bg-gray-100 shadow-2xl w-72 fixed left-0 top-0  ">
      <div className="flex items-center text-3xl font-bold p-4 text-blue-700">

       💻 Mind-Stack
      </div>
      <div className=" pl-10 pt-5 font-serif text-black ">
        <SidebarItem text="Twitter" icon={<TwitterIcon size="md" />}/>
        <SidebarItem text="Youtube" icon={<YoutubeIcon size="md" />} />
        <SidebarItem text="Instagram" icon={<TrashIcon size="md" />} />
        <SidebarItem text="Linkedln" icon={<TrashIcon size="md" />} />
      </div>
    </div>
  );
};
