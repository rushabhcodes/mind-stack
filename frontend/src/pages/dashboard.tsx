import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/ui/Sidebar";
import CreateContentModal from "../components/CreateContentModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardComponent } from "@/components/CardComponent";
import { useContent } from "@/hooks/useContent";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const { content, deleteContent, refreshContent } = useContent();
  return (
    <>
      <Sidebar />
      <CreateContentModal 
        open={open} 
        onClose={() => setOpen(false)} 
        onContentAdded={refreshContent}
      />
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
            onMouseOver={(e) => {
              e.currentTarget.style.filter = "brightness(1.08)";
              e.currentTarget.style.boxShadow =
                "0 4px 16px rgba(59,130,246,0.13)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.filter = "none";
              e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(99,102,241,0.10)";
            }}
            onClick={() => setOpen(true)}
          >
            <PlusIcon size="md" />
            Add Content
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
          {content.map((data, index) => {
            // Create different sizes for bento grid effect
            const getBentoSize = (index: number) => {
              const patterns = [
                "md:col-span-2 md:row-span-2", // Large square
                "md:col-span-1 md:row-span-1", // Regular
                "md:col-span-1 md:row-span-2", // Tall
                "md:col-span-2 md:row-span-1", // Wide
                "md:col-span-1 md:row-span-1", // Regular
                "md:col-span-1 md:row-span-1", // Regular
              ];
              return patterns[index % patterns.length];
            };

            return (
              <div key={data._id} className={`${getBentoSize(index)}`}>
                <CardComponent
                  id={data._id}
                  title={data.title}
                  link={data.link}
                  type={data.type}
                  onDelete={deleteContent}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
