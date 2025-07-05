import { TwitterLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { VideoIcon } from "@radix-ui/react-icons";
import axios from "../../lib/axios";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/api/v1/auth/logout');
      // Clear any local storage or session storage if needed
      localStorage.clear();
      sessionStorage.clear();
      // Redirect to sign in page
      navigate('/signin', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails on server, redirect to signin
      navigate('/signin', { replace: true });
    }
  };

  
  return (
    <aside className="h-screen bg-white shadow-xl w-72 fixed left-0 top-0 flex flex-col border-r border-blue-100 z-30">
      {/* Logo/Brand - styled like landing page */}
      <div className="flex items-center gap-3 p-6 border-b border-blue-100">
        <span
          style={{
            fontWeight: 800,
            fontSize: 26,
            background: "linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px",
          }}
        >
          Mind Stack
        </span>
      </div>
      {/* Organized Navigation */}
      <nav className="flex-1 flex flex-col justify-between">
        <ul className="pt-6 pb-2 px-4 space-y-1">
          <li>
            <a
              href="#twitter"
              className="flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition hover:bg-gray-100"
              style={{
                color: "#000000", // Always black
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#000000")}
              onMouseLeave={e => (e.currentTarget.style.color = "#000000")}
            >
              <TwitterLogoIcon className="w-6 h-6" />
              <span>Twitter</span>
            </a>
          </li>
          <li>
            <a
              href="#youtube"
              className="flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition hover:bg-red-50"
              style={{
                color: "#FF0000", // YouTube red
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#b80000")}
              onMouseLeave={e => (e.currentTarget.style.color = "#FF0000")}
            >
              <VideoIcon className="w-6 h-6" />
              <span>Youtube</span>
            </a>
          </li>
          <li>
            <a
              href="#instagram"
              className="flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition hover:bg-pink-50"
              style={{
                color: "#E1306C", // Instagram pink
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#C13584")}
              onMouseLeave={e => (e.currentTarget.style.color = "#E1306C")}
            >
              <InstagramLogoIcon className="w-6 h-6" />
              <span>Instagram</span>
            </a>
          </li>
          <li>
            <a
              href="#linkedin"
              className="flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition hover:bg-blue-50"
              style={{
                color: "#0077B5", // LinkedIn blue
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#005983")}
              onMouseLeave={e => (e.currentTarget.style.color = "#0077B5")}
            >
              <LinkedInLogoIcon className="w-6 h-6" />
              <span>LinkedIn</span>
            </a>
          </li>
        </ul>
        {/* Logout Button */}
        <div className="px-6 pb-6 pt-2 border-t border-blue-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-semibold transition"
          >
            <span className="text-lg">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};
