import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post(`api/v1/auth/login`, {
      username,
      password,
    });

    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-purple-100">Sign in to access your MindStack</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-purple-100 mb-2"
                >
                  Username
                </label>
                <Input
                  id="username"
                  type="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:border-purple-400 focus:ring-purple-400/50"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-purple-100 mb-2"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:border-purple-400 focus:ring-purple-400/50"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-white/10 text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-purple-100"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="text-purple-300 hover:text-purple-200 font-semibold"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-purple-100">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-purple-300 hover:text-purple-200 font-semibold underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl opacity-30"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-xl opacity-30"></div>
      </div>
    </div>
  );
};
