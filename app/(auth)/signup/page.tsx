"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import AuthCard from "../../components/AuthCard";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup:", { name, email, password, confirmPassword });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 relative overflow-hidden bg-[#f0f5f1]">
        {/* Auth Card */}
        <AuthCard
          title="Create Account"
          subtitle="Join thousands of creators and start building"
          footerText="Already have an account?"
          footerLink="/login"
          footerLinkText="Sign In"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#036627] focus:ring-2 focus:ring-[#036627]/20 transition-all"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#036627] focus:ring-2 focus:ring-[#036627]/20 transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#036627] focus:ring-2 focus:ring-[#036627]/20 transition-all pr-12"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#036627] focus:ring-2 focus:ring-[#036627]/20 transition-all pr-12"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#036627] hover:bg-[#036627]/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#036627]/30 hover:shadow-[#036627]/50 hover:-translate-y-0.5"
            >
              Create Account
            </button>
          </form>
        </AuthCard>
      </div>
    </>
  );
}