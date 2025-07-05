import { Plus, Share2 } from "lucide-react";
import CreateContentModal from "../components/CreateContentModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardComponent } from "@/components/CardComponent";
import { useContent } from "@/hooks/useContent";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import axios from "../lib/axios";
import { toast } from "sonner";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const { content, deleteContent, refreshContent } = useContent();

  const handleShare = async () => {
    setIsSharing(true);

    try {
      // Create a shareable link via backend API
      const response = await axios.post("/api/v1/user/brain/share", {
        share: true,
      });

      if (response.data?.message) {
        // Extract the share path from response (e.g., "/share/abc123")
        const sharePath = response.data.message;
        console.log(sharePath)
        const fullShareUrl = `${window.location.origin}${sharePath}`;
        const shareText = `Check out my MindStack collection! I've organized ${content.length} items in my knowledge hub.`;

        try {
          // Check if Web Share API is available (mobile devices)
          if (navigator.share) {
            await navigator.share({ 
              title: "My MindStack Collection",
              text: shareText,
              url: fullShareUrl,
            });
            toast.success("Content shared successfully!");
          } else {
            // Fallback to clipboard copy
            await navigator.clipboard.writeText(
              `${shareText}\n\n${fullShareUrl}`
            );
            toast.success("Share link copied to clipboard!");
          }
        } catch (shareError) {
          console.error("Error sharing:", shareError);

          // Final fallback - copy just the URL
          try {
            await navigator.clipboard.writeText(fullShareUrl);
            toast.success("Share link copied to clipboard!");
          } catch (clipboardError) {
            console.error("Clipboard access failed:", clipboardError);
            toast.error(
              "Failed to copy link. Please copy manually: " + fullShareUrl
            );
          }
        }
      }
    } catch (error) {
      console.error("Error creating share link:", error);
      toast.error("Failed to create share link. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <SidebarProvider>
      <CreateContentModal
        open={open}
        onClose={() => setOpen(false)}
        onContentAdded={refreshContent}
      />
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleShare}
              disabled={isSharing}
            >
              <Share2 className="w-4 h-4 mr-2" />
              {isSharing ? "Creating Link..." : "Share"}
            </Button>
            <Button
              className="bg-gradient-to-r from-indigo-500 to-blue-400 hover:from-indigo-600 hover:to-blue-500 text-white font-bold"
              onClick={() => setOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Content
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
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
                    description={data.description}
                    type={data.type}
                    onDelete={deleteContent}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
