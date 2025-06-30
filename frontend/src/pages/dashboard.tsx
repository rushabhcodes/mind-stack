import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/ui/Sidebar";
import CreateContentModal from "../components/CreateContentModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardComponent } from "@/components/ui/CardComponent";
import { useContent } from "@/hooks/useContent";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const content = useContent();
  return (
    <>
      <Sidebar />
      <CreateContentModal open={open} onClose={() => setOpen(false)} />
      <div className="ml-72 bg-sky-50 min-h-screen p-6">
        <div className="flex justify-end gap-3 mb-6">
          <Button variant="outline">
            <ShareIcon size="md" />
            Share
          </Button>
          <Button onClick={() => setOpen(true)}>
            <PlusIcon size="md" />
            Add Content
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.map((data)=>(<CardComponent title={data.title} link={data.link}/>)
            )}
          <CardComponent
            title="News"
            type="youtube"
            link="https://www.youtube.com/embed/EQaqgfDT-78?si=zUJ4ROHO5Y28aEgB"
          />
          <CardComponent
            title="My old tweet"
            type="twitter"
            link="https://x.com/rushabhstwt/status/1698522302890057737"
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
