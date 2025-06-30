import axios from "axios";
import { useEffect, useState } from "react";

export function useContent() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const response = axios.get("api/v1/user/content", {}).then((response) => {
      setContent(response.data.content);
    });
  }, []);
  return content;
}
