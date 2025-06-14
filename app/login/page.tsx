"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineWavingHand } from "react-icons/md";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      await login(email, password);

      toast({
        title: "Login Successful",
        description: "Welcome back!",
        type: "default",
      });
      router.push("/admin/dashboard");
    } catch (error) {
      toast({
        title: "Login Failed",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        type: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative w-full h-screen font-montserrat overflow-hidden">
      <Image
        src="/login.png"
        alt="Background"
        fill
        className="object-cover z-0"
        priority
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-tr from-primary/80 to-primary/30" />

      {/* Right-side panel and login form */}
      <div className="absolute right-0 top-0 h-full w-full lg:w-1/2 z-10 bg-[#f5f5ffcc] backdrop-blur-sm px-6 py-10 sm:px-12 flex flex-col justify-between">
        <div className="w-full max-w-[570px] mx-auto">
          <div className="flex items-center space-x-2 mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary">
              Welcome <span className="text-secondary">Back</span>
            </h2>
            <MdOutlineWavingHand className="text-primary w-8 h-8" />
          </div>

          <p className="text-base sm:text-md font-medium text-black leading-[1.6] tracking-wide mb-10">
            The courage to begin is the same courage it takes to succeed. This
            is the courage that usually separates dreamers from achievers.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-base font-normal mb-1">
                E-mail address:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-4 rounded-[40px] bg-[#EEEEFFB2] border border-primary outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div className="relative">
              <label className="block text-base font-normal mb-1">
                Password:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-6 py-4 rounded-[40px] bg-[#EEEEFFB2] border border-primary outline-none pr-12"
                placeholder="Your password"
              />
              <span
                className="absolute top-[52px] right-6 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoEyeOutline className="w-5 h-5" />
                ) : (
                  <IoEyeOffOutline className="w-5 h-5" />
                )}
              </span>
              <a
                href="/forgot-password"
                className="absolute top-0 right-0 text-primary text-sm font-semibold"
              >
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full  text-[20px] font-bold bg-primary text-secondary border border-[#000000cc] shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>

            <div className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-primary text-secondary"
              />
              <label>Remember me</label>
            </div>

            <p className="text-center text-base font-semibold text-secondary">
              Don't have an account?{" "}
              <a href="/signup" className="text-primary underline">
                Sign Up
              </a>
            </p>
          </form>
        </div>

        <p className="text-center text-sm font-semibold text-black/60 mt-10">
          © 2025 Nilphyx. All rights reserved.
        </p>
      </div>

      <div className="hidden lg:absolute top-[35%] left-6 sm:left-12 z-10 text-white lg:block">
        <div className="flex items-center space-x-4">
          <Image src="/logo.png" alt="Logo" width={70} height={70} />
          <h1 className="text-4xl sm:text-5xl font-extrabold">Nilphyx</h1>
        </div>
        <p className="mt-6 text-2xl sm:text-3xl font-semibold max-w-sm">
          Redefining Education & Innovation
        </p>
      </div>
    </main>
  );
}
