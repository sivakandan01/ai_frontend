import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "@/services/api/auth";
import { setUser } from "@/store/slices/userSlice";
import { ThemeToggle } from "@/components/common";

export default function RegisterContainer() {
    const [user_name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register, { isLoading }] = useRegisterMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await register({ email, password, user_name }).unwrap();

            if (response.access_token) {
                localStorage.setItem('access_token', response.access_token);
            }

            if (response.user) {
                dispatch(setUser({
                    id: response.user.id,
                    email: response.user.email,
                    name: response.user.user_name,
                    provider: response.user.provider,
                    model: response.user.model,
                    isAuth: true,
                }));
            }

            navigate("/selection");
        } catch (err: any) {
            setError(err?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[rgb(var(--sidebar-bg))] relative px-4">
            {/* Theme Toggle */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-md px-4 sm:px-6 md:px-8">
                <div className="text-center mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-[rgb(var(--primary-text))] mb-2">Create Account</h1>
                    <p className="text-sm md:text-base text-[rgb(var(--secondary-text))]">Sign up to start chatting</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-600 dark:text-red-400 px-3 md:px-4 py-2.5 md:py-3 rounded-xl text-xs md:text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="name" className="block text-xs md:text-sm font-medium text-[rgb(var(--secondary-text))] mb-1.5 md:mb-2">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={user_name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-[rgb(var(--input-bg))] border border-[rgb(var(--border-color))] rounded-xl focus:outline-none focus:border-emerald-500 text-[rgb(var(--primary-text))] placeholder-gray-500 overflow-hidden"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-xs md:text-sm font-medium text-[rgb(var(--secondary-text))] mb-1.5 md:mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-[rgb(var(--input-bg))] border border-[rgb(var(--border-color))] rounded-xl focus:outline-none focus:border-emerald-500 text-[rgb(var(--primary-text))] placeholder-gray-500 overflow-hidden"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-xs md:text-sm font-medium text-[rgb(var(--secondary-text))] mb-1.5 md:mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-[rgb(var(--input-bg))] border border-[rgb(var(--border-color))] rounded-xl focus:outline-none focus:border-emerald-500 text-[rgb(var(--primary-text))] placeholder-gray-500 overflow-hidden"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-xs md:text-sm font-medium text-[rgb(var(--secondary-text))] mb-1.5 md:mb-2">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-[rgb(var(--input-bg))] border border-[rgb(var(--border-color))] rounded-xl focus:outline-none focus:border-emerald-500 text-[rgb(var(--primary-text))] placeholder-gray-500 overflow-hidden"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 md:py-3.5 text-sm md:text-base bg-[rgb(var(--button-primary))] hover:bg-[rgb(var(--button-hover))] text-[rgb(var(--primary-text))] font-semibold rounded-xl transition-colors mt-6 disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Creating account..." : "Sign Up"}
                    </button>
                </form>

                <div className="mt-5 md:mt-6 text-center">
                    <p className="text-[rgb(var(--secondary-text))] text-xs md:text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-emerald-500 hover:text-emerald-400 font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
