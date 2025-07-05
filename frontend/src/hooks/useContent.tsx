import { extractDomain } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ContentItem {
  _id: string;
  title: string;
  link: string;
  type: string;
  description?: string;
}

export function useContent() {
  const [content, setContent] = useState<ContentItem[]>([]);

  const fetchContent = async () => {
    try {
      const response = await axios.get("api/v1/user/content");
      const contentWithType = response.data.content.map((item: any) => ({
        ...item,
        type: extractDomain(item.link),
      }));
      setContent(contentWithType);
      console.log(content);
    } catch (error) {
      console.error("Error fetching content:", error);
      toast.error("Failed to load content. Please refresh the page.");
    }
  };

  const deleteContent = async (id: string) => {
    try {
      await axios.delete(`api/v1/user/content/${id}`);
      // Remove the deleted item from local state
      setContent((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting content:", error);
      throw error; // Re-throw so the component can handle it
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return { content, deleteContent, refreshContent: fetchContent };
}
