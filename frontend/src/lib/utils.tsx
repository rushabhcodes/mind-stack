import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram,
  MessageSquare,
  Globe,
  Video,
  FileText
} from "lucide-react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const extractDomain = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return 'unknown';
  }
};

// Function to get the appropriate icon based on type
export const getTypeIcon = (type: string) => {
  const lowerType = type.toLowerCase();
  
  // YouTube
  if (lowerType.includes('youtube') || lowerType.includes('youtu.be')) {
    return <Video className="h-5 w-5 text-red-600" />;
  }
  
  // Twitter/X
  if (lowerType.includes('twitter') || lowerType.includes('x.com')) {
    return <Twitter className="h-5 w-5 text-black" />;
  }
  
  // GitHub
  if (lowerType.includes('github')) {
    return <Github className="h-5 w-5 text-gray-800" />;
  }
  
  // LinkedIn
  if (lowerType.includes('linkedin')) {
    return <Linkedin className="h-5 w-5 text-blue-600" />;
  }
  
  // Instagram
  if (lowerType.includes('instagram') || lowerType.includes('instagr.am')) {
    return <Instagram className="h-5 w-5 text-pink-600" />;
  }
  
  // TikTok - using video icon as alternative
  if (lowerType.includes('tiktok')) {
    return <Video className="h-5 w-5 text-black" />;
  }
  
  // Reddit - using message square icon as alternative
  if (lowerType.includes('reddit')) {
    return <MessageSquare className="h-5 w-5 text-orange-600" />;
  }
  
  // Medium - using file text icon
  if (lowerType.includes('medium')) {
    return <FileText className="h-5 w-5 text-green-600" />;
  }
  
  // Discord - using message square icon as alternative
  if (lowerType.includes('discord')) {
    return <MessageSquare className="h-5 w-5 text-indigo-600" />;
  }
  
  // Telegram - using message square icon as alternative
  if (lowerType.includes('telegram') || lowerType.includes('t.me')) {
    return <MessageSquare className="h-5 w-5 text-blue-500" />;
  }
  
  // Default icon for unknown types
  return <Globe className="h-5 w-5 text-gray-500" />;
};