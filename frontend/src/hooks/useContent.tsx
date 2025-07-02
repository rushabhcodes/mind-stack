import { extractDomain } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

interface ContentItem {
  title: string;
  link: string;
  type: string;
}

export function useContent() {
  const [content, setContent] = useState<ContentItem[]>([]);

  useEffect(() => {
    axios.get("api/v1/user/content", {}).then((response) => {
      const contentWithType = response.data.content.map((item: any) => ({
        ...item,
        type: extractDomain(item.link),
      }));

      setContent(contentWithType);
    });
  }, []);

  return content;
}