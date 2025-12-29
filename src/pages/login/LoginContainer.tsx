import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/services/api/auth";
import { setUser } from "@/store/slices/userSlice";
import { ThemeToggle } from "@/components/common";

export default function LoginContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login({ email, password }).unwrap();

      if (response.access_token) {
        localStorage.setItem('access_token', response.access_token);
      }

      if (response.user) {
        dispatch(setUser({
          email: response.user.email,
          name: response.user.user_name,
          provider: response.user.provider,
          model: response.user.model,
        }));
      }

      navigate("/selection");
    } catch (err: any) {
      setError(err?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[rgb(var(--sidebar-bg))] relative">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[rgb(var(--primary-text))] mb-2">Welcome Back</h1>
          <p className="text-[rgb(var(--secondary-text))]">Sign in to continue to chat</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[rgb(var(--secondary-text))] mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-[rgb(var(--input-bg))] border border-[rgb(var(--border-color))] rounded-xl focus:outline-none focus:border-emerald-500 text-[rgb(var(--primary-text))] placeholder-gray-500 overflow-hidden"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[rgb(var(--secondary-text))] mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-[rgb(var(--input-bg))] border border-[rgb(var(--border-color))] rounded-xl focus:outline-none focus:border-emerald-500 text-[rgb(var(--primary-text))] placeholder-gray-500 overflow-hidden"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[rgb(var(--button-primary))] hover:bg-[rgb(var(--button-hover))] text-[rgb(var(--primary-text))] font-semibold rounded-xl transition-colors mt-6 disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[rgb(var(--secondary-text))] text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-emerald-500 hover:text-emerald-400 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
