import { getTypeIcon } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Trash2, Share } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const CardComponent = ({
  title,
  link,
  type = "unknown",
  id,
  onDelete,
  description,
}: {
  title: string;
  link: string;
  type: string;
  id: string;
  onDelete?: (id: string) => void;
  description?: string;
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

    // LinkedIn - doesn't allow iframe embedding due to X-Frame-Options
    if (lowerType.includes("linkedin") || url.includes("linkedin.com")) {
      return null; // LinkedIn blocks iframe embedding for security
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

  // Function to get a special preview for non-embeddable content
  const getSpecialPreview = () => {
    const lowerType = type.toLowerCase();
    const lowerLink = link.toLowerCase();

    // LinkedIn special preview
    if (lowerType.includes("linkedin") || lowerLink.includes("linkedin.com")) {
      let contentType = "LinkedIn Content";
      let icon = "💼";

      if (lowerLink.includes("/in/")) {
        contentType = "LinkedIn Profile";
        icon = "👤";
      } else if (lowerLink.includes("/company/")) {
        contentType = "LinkedIn Company";
        icon = "🏢";
      } else if (
        lowerLink.includes("/posts/") ||
        lowerLink.includes("/feed/update/")
      ) {
        contentType = "LinkedIn Post";
        icon = "📝";
      }

      return (
        <div className="w-full flex-1 min-h-[120px] bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-md flex flex-col items-center justify-center text-blue-700 p-4">
          <div className="text-3xl mb-2">{icon}</div>
          <p className="text-center font-medium mb-2">{contentType}</p>
          <p className="text-sm text-center mb-3 text-blue-600">
            LinkedIn content cannot be embedded for security reasons
          </p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Open on LinkedIn
          </a>
        </div>
      );
    }

    // Instagram special preview
    if (
      lowerType.includes("instagram") ||
      lowerLink.includes("instagram.com")
    ) {
      return (
        <div className="w-full flex-1 min-h-[120px] bg-gradient-to-br from-pink-50 to-purple-100 border-2 border-pink-200 rounded-md flex flex-col items-center justify-center text-pink-700 p-4">
          <div className="text-3xl mb-2">📸</div>
          <p className="text-center font-medium mb-2">Instagram Content</p>
          <p className="text-sm text-center mb-3 text-pink-600">
            Instagram content cannot be embedded
          </p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors text-sm font-medium"
          >
            Open on Instagram
          </a>
        </div>
      );
    }

    // GitHub special preview
    if (lowerType.includes("github") || lowerLink.includes("github.com")) {
      return (
        <div className="w-full flex-1 min-h-[120px] bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-md flex flex-col items-center justify-center text-gray-700 p-4">
          <div className="text-3xl mb-2">⚡</div>
          <p className="text-center font-medium mb-2">GitHub Repository</p>
          <p className="text-sm text-center mb-3 text-gray-600">
            Code repository or documentation
          </p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors text-sm font-medium"
          >
            Open on GitHub
          </a>
        </div>
      );
    }

    // Default fallback
    return (
      <div className="w-full flex-1 min-h-[120px] bg-gray-100 border rounded-md flex items-center justify-center text-gray-500">
        <p className="text-center px-4">
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
    );
  };

  const handleDelete = async () => {
    if (!onDelete || !id) return;

    setIsDeleting(true);
    try {
      await onDelete(id);
      toast.success("Content deleted successfully!");
    } catch (error) {
      console.error("Error deleting content:", error);
      toast.error("Failed to delete content. Please try again.");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleShareClick = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy link:", error);
      toast.error("Failed to copy link. Please try again.");
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 min-w-0 flex-1">
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
              <Share className="w-4 h-4" />
            </button>
            {onDelete && (
              <>
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
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {iframeSrc ? (
          <iframe
            src={iframeSrc}
            className="w-full flex-1 min-h-[200px] border rounded-md"
            frameBorder="0"
            allowFullScreen
            title={`Embedded content: ${title}`}
          />
        ) : (
          getSpecialPreview()
        )}
        {description && (
          <div className="mt-3 p-3 bg-gray-50 rounded-md border">
            <div className="text-sm text-gray-700 leading-relaxed">
              {description.split("\n").map((line, index) => (
                <p key={index} className={index > 0 ? "mt-2" : ""}>
                  {line
                    .split(/(\*\*.*?\*\*|\*.*?\*)/)
                    .map((part, partIndex) => {
                      if (part.startsWith("**") && part.endsWith("**")) {
                        // Bold text
                        return (
                          <strong key={partIndex} className="font-semibold">
                            {part.slice(2, -2)}
                          </strong>
                        );
                      } else if (part.startsWith("*") && part.endsWith("*")) {
                        // Italic text
                        return (
                          <em key={partIndex} className="italic">
                            {part.slice(1, -1)}
                          </em>
                        );
                      }
                      return part;
                    })}
                </p>
              ))}
            </div>
          </div>
        )}
        <div className="mt-3">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline break-all line-clamp-2"
          >
            {link}
          </a>
        </div>
      </CardContent>
      <CardFooter className="flex-shrink-0 text-sm text-gray-500">
        {type}
      </CardFooter>
    </Card>
  );
};
