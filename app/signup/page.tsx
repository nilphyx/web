"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image";
import { EyeOff, Eye } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

// Form validation schema
const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  country: z.string().min(1, "Please select a country"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      country: "",
      phone: "",
      terms: true,
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Form data submitted:", data)

      toast({
        title: "Registration successful!",
        description: "Your account has been created.",
      })

      // In a real app, you would redirect to login or dashboard
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was a problem with your registration.",
        type: "destructive",
      })
      console.error("Registration error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side with background image - hidden on mobile, visible on md and up */}
      <div
        className="relative hidden bg-leximpact-blue text-white md:block md:w-5/12 lg:w-1/2"
        style={{
          backgroundImage:
            "url('/signup.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-leximpact-blue bg-opacity-30" />
        <div className="absolute left-4 top-4 z-10 sm:left-6 sm:top-6 md:left-8 md:top-8">
          <div className="flex items-center gap-2">
             <Image
                     src="/white-favicon.png"
                     alt="Logo"
                     width={237}
                     height={80}
                     
                   />
            <span className="text-xl font-bold sm:text-2xl">Leximpact</span>
          </div>
        </div>
      </div>

      {/* Mobile logo - visible on mobile, hidden on md and up */}
      <div className="flex items-center justify-start bg-leximpact-blue p-4 md:hidden">
        <div className="flex items-center gap-2 text-white">
          <Image
                     src="/white-logo.png"
                     alt="Logo"
                     width={237}
                     height={80}
                     
                   />
          <span className="text-xl font-bold">Leximpact</span>
        </div>
      </div>

      {/* Right side with form */}
      <div className="flex flex-1 flex-col bg-gray-100 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-0 md:pt-0 lg:px-12 xl:px-16">
        <div className="mx-auto w-full max-w-md md:my-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Register <span className="text-leximpact-navy">Now</span>
            </h1>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Have an account?{" "}
              <Link href="/login" className="text-leximpact-navy hover:underline">
                Log in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 md:space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-1 block text-sm font-medium">
                  First Name
                </label>
                <Input
                  id="firstName"
                  className={`h-10 rounded-full border bg-white px-4 py-2 text-sm focus-visible:ring-leximpact-navy sm:h-12 sm:text-base ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("firstName")}
                />
                {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="mb-1 block text-sm font-medium">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  className={`h-10 rounded-full border bg-white px-4 py-2 text-sm focus-visible:ring-leximpact-navy sm:h-12 sm:text-base ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("lastName")}
                />
                {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                className={`h-10 rounded-full border bg-white px-4 py-2 text-sm focus-visible:ring-leximpact-navy sm:h-12 sm:text-base ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                {...register("email")}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={`h-10 rounded-full border bg-white px-4 py-2 pr-12 text-sm focus-visible:ring-leximpact-navy sm:h-12 sm:text-base ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <Eye size={18} className="sm:h-5 sm:w-5" />
                  ) : (
                    <EyeOff size={18} className="sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="country" className="mb-1 block text-sm font-medium">
                Country
              </label>
              <select
                id="country"
                className={`h-10 w-full rounded-full border bg-white px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-leximpact-navy sm:h-12 sm:text-base ${
                  errors.country ? "border-red-500 text-gray-900" : "border-gray-300 text-gray-400"
                }`}
                {...register("country")}
              >
                <option value="" disabled>
                  Select your country
                </option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="ng">Nigeria</option>
                <option value="other">Other</option>
              </select>
              {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                Mobile Number
              </label>
              <div className="flex gap-2">
                <div className="flex h-10 w-[100px] items-center justify-between rounded-full border border-gray-300 bg-white px-2 py-2 sm:h-12 sm:w-[120px] sm:px-3">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="h-5 w-5 overflow-hidden rounded sm:h-6 sm:w-6">
                      <div className="flex h-full flex-col">
                        <div className="h-1/3 bg-green-600"></div>
                        <div className="h-1/3 bg-white"></div>
                        <div className="h-1/3 bg-green-600"></div>
                      </div>
                    </div>
                    <span className="text-xs sm:text-base">+234</span>
                  </div>
                  <span className="text-xs sm:text-sm">▼</span>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Phone Number"
                  className={`h-10 flex-1 rounded-full border bg-white px-4 py-2 text-sm focus-visible:ring-leximpact-navy sm:h-12 sm:text-base ${
                    errors.phone ? "border-red-500" : "border-gray-300 text-gray-400"
                  }`}
                  {...register("phone")}
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                className={`mt-1 h-4 w-4 rounded border text-leximpact-navy ${
                  errors.terms ? "border-red-500" : "border-gray-300"
                }`}
                {...register("terms")}
              />
              <div>
                <label htmlFor="terms" className="text-xs sm:text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-leximpact-navy hover:underline">
                    Terms & Conditions
                  </Link>
                </label>
                {errors.terms && <p className="text-xs text-red-500">{errors.terms.message}</p>}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-10 w-full rounded-full bg-leximpact-button py-2 text-sm font-medium hover:bg-leximpact-button-hover sm:h-12 sm:text-base md:text-lg"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500 sm:mt-8 sm:text-sm">
            © 2025 Leximpact. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}
