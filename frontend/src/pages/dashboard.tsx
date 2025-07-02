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
          <Button
  style={{
    background: "linear-gradient(90deg, #6366f1 0%, #38bdf8 100%)",
    color: "white",
    fontWeight: 700,
    fontSize: 15,
    border: "none",
    borderRadius: 10,
    padding: "6px 14px",
    cursor: "pointer",
    transition: "box-shadow 0.2s, filter 0.2s",
    boxShadow: "0 2px 8px rgba(99,102,241,0.10)",
    minHeight: 0,
    minWidth: 0,
  }}
  onMouseOver={e => {
    e.currentTarget.style.filter = "brightness(1.08)";
    e.currentTarget.style.boxShadow = "0 4px 16px rgba(59,130,246,0.13)";
  }}
  onMouseOut={e => {
    e.currentTarget.style.filter = "none";
    e.currentTarget.style.boxShadow = "0 2px 8px rgba(99,102,241,0.10)";
  }}
  onClick={() => setOpen(true)}
>
  <PlusIcon size={16} />
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
