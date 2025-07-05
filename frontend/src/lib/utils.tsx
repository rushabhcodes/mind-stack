import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { 
  GitHubLogoIcon, 
  TwitterLogoIcon, 
  LinkedInLogoIcon, 
  InstagramLogoIcon,
  DiscordLogoIcon,
  GlobeIcon,
  VideoIcon,
  ChatBubbleIcon,
  ReaderIcon
} from "@radix-ui/react-icons"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const extractDomain = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch (error) {
    return 'unknown';
  }
};

// Function to get the appropriate icon based on type
export const getTypeIcon = (type: string) => {
  const lowerType = type.toLowerCase();
  
  // YouTube
  if (lowerType.includes('youtube') || lowerType.includes('youtu.be')) {
    return <VideoIcon className="h-5 w-5 text-red-600" />;
  }
  
  // Twitter/X
  if (lowerType.includes('twitter') || lowerType.includes('x.com')) {
    return <TwitterLogoIcon className="h-5 w-5 text-black" />;
  }
  
  // GitHub
  if (lowerType.includes('github')) {
    return <GitHubLogoIcon className="h-5 w-5 text-gray-800" />;
  }
  
  // LinkedIn
  if (lowerType.includes('linkedin')) {
    return <LinkedInLogoIcon className="h-5 w-5 text-blue-600" />;
  }
  
  // Instagram
  if (lowerType.includes('instagram') || lowerType.includes('instagr.am')) {
    return <InstagramLogoIcon className="h-5 w-5 text-pink-600" />;
  }
  
  // TikTok - using video icon as alternative
  if (lowerType.includes('tiktok')) {
    return <VideoIcon className="h-5 w-5 text-black" />;
  }
  
  // Reddit - using chat bubble icon as alternative
  if (lowerType.includes('reddit')) {
    return <ChatBubbleIcon className="h-5 w-5 text-orange-600" />;
  }
  
  // Medium - using reader icon
  if (lowerType.includes('medium')) {
    return <ReaderIcon className="h-5 w-5 text-green-600" />;
  }
  
  // Discord
  if (lowerType.includes('discord')) {
    return <DiscordLogoIcon className="h-5 w-5 text-indigo-600" />;
  }
  
  // Telegram - using chat bubble icon as alternative
  if (lowerType.includes('telegram') || lowerType.includes('t.me')) {
    return <ChatBubbleIcon className="h-5 w-5 text-blue-500" />;
  }
  
  // Default icon for unknown types
  return <GlobeIcon className="h-5 w-5 text-gray-500" />;
};