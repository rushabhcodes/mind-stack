import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../lib/axios";
import { CardComponent } from "@/components/CardComponent";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";

interface SharedContent {
  _id: string;
  title: string;
  link: string;
  description?: string;
  type: string;
}

interface SharedData {
  userId: {
    username: string;
    email: string;
  };
  hash: string;
  content?: SharedContent[];
}

export default function SharedPage() {
  const { shareLink } = useParams<{ shareLink: string }>();
  const [sharedData, setSharedData] = useState<SharedData | null>(null);
  const [content, setContent] = useState<SharedContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedContent = async () => {
      if (!shareLink) {
        setError("Invalid share link");
        setIsLoading(false);
        return;
      }

      try {
        // Get shared content directly using the backend endpoint
        const contentResponse = await axios.get(`/api/v1/user/brain/shared/${shareLink}`);
        
        if (contentResponse.data?.content && contentResponse.data?.user) {
          // Set the shared data structure
          setSharedData({
            userId: contentResponse.data.user,
            hash: shareLink
          });
          
          // Set the actual content
          setContent(contentResponse.data.content);
        } else {
          setError("Shared content not found");
        }
      } catch (error: any) {
        console.error("Error fetching shared data:", error);
        if (error.response?.status === 404) {
          setError("This share link doesn't exist or has been removed.");
        } else {
          setError("Failed to load shared content. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSharedContent();
  }, [shareLink]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading shared collection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Content Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go to MindStack
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-600 text-white flex items-center justify-center w-8 h-8 rounded-lg">
                <span className="text-sm font-bold">M</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {sharedData?.userId?.username || 'User'}'s MindStack
                </h1>
                <p className="text-sm text-gray-500">
                  Shared knowledge collection
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <a href="/" className="flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Create Your Own
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {content.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Content Yet</h2>
            <p className="text-gray-600 mb-6">
              This collection is empty. <strong>{sharedData?.userId?.username || 'The owner'}</strong> hasn't added any content to share yet.
            </p>
            <Button variant="outline" asChild>
              <a href="/" className="flex items-center">
                <ExternalLink className="w-4 h-4 mr-2" />
                Create Your Own Collection
              </a>
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Shared Collection
              </h2>
              <p className="text-gray-600">
                {content.length} item{content.length !== 1 ? 's' : ''} in this knowledge hub
              </p>
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
                      description={data.description}
                      type={data.type}
                      // No delete function for shared view
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>Powered by <strong>MindStack</strong> - Organize and share your knowledge</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
