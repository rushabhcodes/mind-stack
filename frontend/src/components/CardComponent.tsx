import { getTypeIcon } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { TrashIcon } from "@/icons/TrashIcon";
import { ShareIcon } from "@/icons/ShareIcon";
import { useState } from "react";

export const CardComponent = ({
  title,
  link,
  type = "unknown",
  id,
  onDelete,
}: {
  title: string;
  link: string;
  type: string;
  id: string;
  onDelete?: (id: string) => void;
}) => {
  // Function to get the appropriate iframe source based on type
  const getIframeSrc = (url: string, contentType: string): string | null => {
    const lowerType = contentType.toLowerCase();

    // YouTube - convert to embed URL
    if (
      lowerType.includes("youtube") ||
      url.includes("youtube.com") ||
      url.includes("youtu.be")
    ) {
      let videoId = "";
      if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("v=")[1]?.split("&")[0];
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    // Twitter/X - can be embedded using Twitter's embed system
    if (
      lowerType.includes("twitter") ||
      lowerType.includes("x.com") ||
      url.includes("twitter.com") ||
      url.includes("x.com")
    ) {
      // Extract tweet ID and create embed URL
      const tweetMatch = url.match(/\/status\/(\d+)/);
      if (tweetMatch && tweetMatch[1]) {
        const tweetId = tweetMatch[1];
        // Use Twitter's embed iframe
        return `https://platform.twitter.com/embed/Tweet.html?id=${tweetId}`;
      }
      return url; // Fallback to direct URL
    }

    // GitHub - can be embedded but may not render properly
    if (lowerType.includes("github") || url.includes("github.com")) {
      return null; // Some GitHub pages can be embedded
    }

    // LinkedIn - doesn't allow iframe embedding
    if (lowerType.includes("linkedin") || url.includes("linkedin.com")) {
      return null;
    }

    // Instagram - doesn't allow iframe embedding
    if (lowerType.includes("instagram") || url.includes("instagram.com")) {
      return null;
    }

    // Medium - can be embedded
    if (lowerType.includes("medium") || url.includes("medium.com")) {
      return url;
    }

    // For other types, try to embed directly
    return url;
  };

  const iframeSrc = getIframeSrc(link, type);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    if (!onDelete || !id) return;
    
    setIsDeleting(true);
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Error deleting content:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleShareClick = async () => {
    try {
      await navigator.clipboard.writeText(link);
      // You could add a toast notification here
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="text-gray-500 flex-shrink-0">
              {getTypeIcon(type)}
            </div>
            <h3 className="font-medium text-gray-900 truncate">{title}</h3>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
              onClick={handleShareClick}
              title="Share link"
            >
              <ShareIcon size="sm" />
            </button>
            {showDeleteConfirm ? (
              <div className="flex items-center gap-1">
                <button
                  className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  title="Confirm delete"
                >
                  {isDeleting ? "..." : "Yes"}
                </button>
                <button
                  className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  onClick={() => setShowDeleteConfirm(false)}
                  title="Cancel delete"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                className="p-1 hover:bg-gray-100 rounded-md transition-colors text-red-500 hover:text-red-700"
                onClick={() => setShowDeleteConfirm(true)}
                title="Delete"
              >
                <TrashIcon size="sm" />
              </button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {iframeSrc ? (
          <iframe
            src={iframeSrc}
            className="w-full h-64 border rounded-md"
            frameBorder="0"
            allowFullScreen
            title={`Embedded content: ${title}`}
          />
        ) : (
          <div className="w-full h-32 bg-gray-100 border rounded-md flex items-center justify-center text-gray-500">
            <p>
              Preview not available -{" "}
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Open link
              </a>
            </p>
          </div>
        )}
        <div className="mb-3">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {link}
          </a>
        </div>
      </CardContent>
      <CardFooter>{type}</CardFooter>
    </Card>
  );
};
