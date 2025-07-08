import { extractDomain } from "@/lib/utils";
import axios from "../lib/axios";
import { useEffect, useState, useCallback } from "react";
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

  const fetchContent = useCallback(async () => {
    try {
      const response = await axios.get("/api/v1/user/content");
      const contentWithType = response.data.content.map((item: unknown) => ({
        ...(item as ContentItem),
        type: extractDomain((item as ContentItem).link),
      }));
      setContent(contentWithType);
      console.log(contentWithType);
    } catch (error) {
      console.error("Error fetching content:", error);
      toast.error("Failed to load content. Please refresh the page.");
    }
  }, []);

  const deleteContent = async (id: string) => {
    try {
      await axios.delete(`/api/v1/user/content/${id}`);
      // Remove the deleted item from local state
      setContent((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting content:", error);
      throw error; // Re-throw so the component can handle it
    }
  };

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { content, deleteContent, refreshContent: fetchContent };
}
