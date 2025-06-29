"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image";
import { useRouter } from "next/navigation"
import { EyeOff, Eye } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/utils/supabase/client"

// Note: Metadata must be in a separate layout file for client components
// This is just for documentation purposes

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
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  country: z.string().min(1, "Please select a country"),
  phone: z.string().min(6, "Please enter a valid phone number")
    .refine(val => /^\d+$/.test(val), {
      message: "Phone number can only contain digits"
    }),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
})

type RegisterFormValues = z.infer<typeof registerSchema>

// Add country data with flags and phone codes
const countryData = {
  dz: { name: "Algeria", phoneCode: "+213", flag: "🇩🇿" },
  ao: { name: "Angola", phoneCode: "+244", flag: "🇦🇴" },
  bj: { name: "Benin", phoneCode: "+229", flag: "🇧🇯" },
  bw: { name: "Botswana", phoneCode: "+267", flag: "🇧🇼" },
  bf: { name: "Burkina Faso", phoneCode: "+226", flag: "🇧🇫" },
  bi: { name: "Burundi", phoneCode: "+257", flag: "🇧🇮" },
  cv: { name: "Cabo Verde", phoneCode: "+238", flag: "🇨🇻" },
  cm: { name: "Cameroon", phoneCode: "+237", flag: "🇨🇲" },
  cf: { name: "Central African Republic", phoneCode: "+236", flag: "🇨🇫" },
  td: { name: "Chad", phoneCode: "+235", flag: "🇹🇩" },
  km: { name: "Comoros", phoneCode: "+269", flag: "🇰🇲" },
  cd: { name: "Congo (DRC)", phoneCode: "+243", flag: "🇨🇩" },
  cg: { name: "Congo (Republic)", phoneCode: "+242", flag: "🇨🇬" },
  ci: { name: "Côte d'Ivoire", phoneCode: "+225", flag: "🇨🇮" },
  dj: { name: "Djibouti", phoneCode: "+253", flag: "🇩🇯" },
  eg: { name: "Egypt", phoneCode: "+20", flag: "🇪🇬" },
  gq: { name: "Equatorial Guinea", phoneCode: "+240", flag: "🇬🇶" },
  er: { name: "Eritrea", phoneCode: "+291", flag: "🇪🇷" },
  sz: { name: "Eswatini", phoneCode: "+268", flag: "🇸🇿" },
  et: { name: "Ethiopia", phoneCode: "+251", flag: "🇪🇹" },
  ga: { name: "Gabon", phoneCode: "+241", flag: "🇬🇦" },
  gm: { name: "Gambia", phoneCode: "+220", flag: "🇬🇲" },
  gh: { name: "Ghana", phoneCode: "+233", flag: "🇬🇭" },
  gn: { name: "Guinea", phoneCode: "+224", flag: "🇬🇳" },
  gw: { name: "Guinea-Bissau", phoneCode: "+245", flag: "🇬🇼" },
  ke: { name: "Kenya", phoneCode: "+254", flag: "🇰🇪" },
  ls: { name: "Lesotho", phoneCode: "+266", flag: "🇱🇸" },
  lr: { name: "Liberia", phoneCode: "+231", flag: "🇱🇷" },
  ly: { name: "Libya", phoneCode: "+218", flag: "🇱🇾" },
  mg: { name: "Madagascar", phoneCode: "+261", flag: "🇲🇬" },
  mw: { name: "Malawi", phoneCode: "+265", flag: "🇲🇼" },
  ml: { name: "Mali", phoneCode: "+223", flag: "🇲🇱" },
  mr: { name: "Mauritania", phoneCode: "+222", flag: "🇲🇷" },
  mu: { name: "Mauritius", phoneCode: "+230", flag: "🇲🇺" },
  yt: { name: "Mayotte", phoneCode: "+262", flag: "🇾🇹" },
  ma: { name: "Morocco", phoneCode: "+212", flag: "🇲🇦" },
  mz: { name: "Mozambique", phoneCode: "+258", flag: "🇲🇿" },
  na: { name: "Namibia", phoneCode: "+264", flag: "🇳🇦" },
  ne: { name: "Niger", phoneCode: "+227", flag: "🇳🇪" },
  ng: { name: "Nigeria", phoneCode: "+234", flag: "🇳🇬" },
  re: { name: "Réunion", phoneCode: "+262", flag: "🇷🇪" },
  rw: { name: "Rwanda", phoneCode: "+250", flag: "🇷🇼" },
  st: { name: "Sao Tome and Principe", phoneCode: "+239", flag: "🇸🇹" },
  sn: { name: "Senegal", phoneCode: "+221", flag: "🇸🇳" },
  sc: { name: "Seychelles", phoneCode: "+248", flag: "🇸🇨" },
  sl: { name: "Sierra Leone", phoneCode: "+232", flag: "🇸🇱" },
  so: { name: "Somalia", phoneCode: "+252", flag: "🇸🇴" },
  za: { name: "South Africa", phoneCode: "+27", flag: "🇿🇦" },
  ss: { name: "South Sudan", phoneCode: "+211", flag: "🇸🇸" },
  sd: { name: "Sudan", phoneCode: "+249", flag: "🇸🇩" },
  tz: { name: "Tanzania", phoneCode: "+255", flag: "🇹🇿" },
  tg: { name: "Togo", phoneCode: "+228", flag: "🇹🇬" },
  tn: { name: "Tunisia", phoneCode: "+216", flag: "🇹🇳" },
  ug: { name: "Uganda", phoneCode: "+256", flag: "🇺🇬" },
  eh: { name: "Western Sahara", phoneCode: "+212", flag: "🇪🇭" },
  zm: { name: "Zambia", phoneCode: "+260", flag: "🇿🇲" },
  zw: { name: "Zimbabwe", phoneCode: "+263", flag: "🇿🇼" },
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<string>("ng") // Default to Nigeria
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const countryDropdownRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      country: "ng", // Default to Nigeria
      phone: "",
      terms: true,
    },
  })
  
  // Watch for country changes
  const watchCountry = watch("country");
  
  // Update selected country when form value changes
  useEffect(() => {
    if (watchCountry) {
      setSelectedCountry(watchCountry);
    }
  }, [watchCountry])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Handle country selection from dropdown
  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setShowCountryDropdown(false);
    
    // Update the form value
    const event = {
      target: {
        name: "country",
        value: countryCode,
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    
    register("country").onChange(event);
  };
  
  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Remove any non-digits
    const phoneNumber = value.replace(/\D/g, "");
    return phoneNumber;
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    e.target.value = formattedPhone;
    return e;
  };
  
  const router = useRouter();
  const supabase = createClient();

  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  
  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true)

    try {
      // Get the phone code for the selected country
      const phoneCode = countryData[data.country as keyof typeof countryData]?.phoneCode || '';
      const fullPhoneNumber = `${phoneCode}${data.phone}`;
      
      // Sign up with Supabase
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            country: data.country,
            phone: fullPhoneNumber,
            full_name: `${data.firstName} ${data.lastName}`,
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      })

      if (error) throw error;

      if (authData?.user) {
        // Store the user email for display in the verification modal
        setUserEmail(data.email)
        
        // Show verification modal
        setShowVerificationModal(true)
        
        toast({
          title: "Registration successful!",
          description: "Please check your email to verify your account.",
        })
      }
    } catch (error: any) {
      let errorMessage = "There was a problem with your registration.";
      
      // Handle specific Supabase error messages
      if (error.message) {
        if (error.message.includes("already registered")) {
          errorMessage = "This email is already registered. Please log in instead.";
        } else if (error.message.includes("password")) {
          errorMessage = "Your password doesn't meet the security requirements.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        type: "destructive",
      });
      
      console.error("Registration error:", error);
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
          backgroundImage: "url('/sign-up-page.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          
        }}
      >
        <div className="absolute inset-0 bg-leximpact-blue bg-opacity-30" />
        <div className="absolute left-4 top-4 z-10 sm:left-6 sm:top-6 md:left-8 md:top-8">
          <div className="flex items-center gap-2">
            <Image
              src="/white-logo.png"
              alt="Nilphyx logo"
              width={237}
              height={80}
              priority // Ensures the image loads as soon as possible
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            />
          </div>
        </div>
        <div className="absolute bottom-8 left-0 right-0 text-center z-10">
          <h2 className="text-white text-3xl font-bold drop-shadow-lg">Join Our Community</h2>
          <p className="text-white text-lg mt-2 drop-shadow-md">Create an account to get started</p>
        </div>
      </div>

      {/* Right side with form */}
      <div className="flex flex-1 flex-col bg-gray-100 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-0 md:pt-0 lg:px-12 xl:px-16">
        <div className="mx-auto w-full max-w-md md:my-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Create Nilphyx Account
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
              <div className="mt-2 text-xs text-gray-500">
                Password must contain:
                <ul className="mt-1 list-inside list-disc">
                  <li>At least 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One number</li>
                  <li>One special character</li>
                </ul>
              </div>
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
                {Object.entries(countryData).map(([code, data]) => (
                  <option key={code} value={code}>
                    {data.flag} {data.name}
                  </option>
                ))}
              </select>
              {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                Mobile Number
              </label>
              <div className="flex gap-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="flex h-10 w-[100px] items-center justify-between rounded-full border border-gray-300 bg-white px-2 py-2 sm:h-12 sm:w-[120px] sm:px-3"
                  >
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="flex h-5 w-5 items-center justify-center overflow-hidden rounded sm:h-6 sm:w-6">
                        <span className="text-base sm:text-lg">
                          {selectedCountry && countryData[selectedCountry as keyof typeof countryData]?.flag}
                        </span>
                      </div>
                      <span className="text-xs sm:text-base">
                        {selectedCountry && countryData[selectedCountry as keyof typeof countryData]?.phoneCode}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm">▼</span>
                  </button>
                  
                  {showCountryDropdown && (
                    <div 
                      ref={countryDropdownRef}
                      className="absolute left-0 top-full z-10 mt-1 max-h-60 w-64 overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg"
                    >
                      {Object.entries(countryData).map(([code, data]) => (
                        <button
                          key={code}
                          type="button"
                          className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100"
                          onClick={() => handleCountrySelect(code)}
                        >
                          <span className="text-lg">{data.flag}</span>
                          <span className="text-sm">{data.name}</span>
                          <span className="ml-auto text-xs text-gray-500">{data.phoneCode}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Phone Number"
                  className={`h-10 flex-1 rounded-full border bg-white px-4 py-2 text-sm focus-visible:ring-leximpact-navy sm:h-12 sm:text-base ${
                    errors.phone ? "border-red-500" : "border-gray-300 text-gray-400"
                  }`}
                  {...register("phone", {
                    onChange: (e) => handlePhoneChange(e)
                  })}
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
              className="h-10 w-full rounded-full bg-primary py-2 text-sm font-medium hover:bg-leximpact-button-hover sm:h-12 sm:text-base md:text-lg"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="ml-2">Registering...</span>
                </div>
              ) : (
                "Register"
              )}
            </Button>
          </form>

        </div>
      </div>
      
      {/* Email Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative rounded-lg bg-white p-6 shadow-xl sm:p-8 md:max-w-md md:p-10">
            <div className="mb-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="h-16 w-16 rounded-full bg-green-100 p-2 text-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-12 w-12 text-green-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" 
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold sm:text-xl">Verify Your Email Address</h3>
              <p className="mt-2 text-sm text-gray-600">
                We've sent a verification email to:
              </p>
              <p className="mt-1 font-medium text-leximpact-navy">
                {userEmail}
              </p>
              <p className="mt-4 text-sm text-gray-600">
                Please check your inbox and click on the verification link to complete your registration.
              </p>
              
              <div className="mt-6 text-left rounded-md bg-amber-50 p-4 text-sm">
                <p className="font-medium text-amber-800">Can't find the email?</p>
                <ul className="mt-2 list-inside list-disc text-amber-700">
                  <li>Check your spam or junk folder</li>
                  <li>Make sure you entered the correct email address</li>
                  <li>Allow a few minutes for the email to arrive</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                className="w-full rounded-full bg-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-300 sm:w-1/2"
                onClick={() => setShowVerificationModal(false)}
              >
                Close
              </button>
              <button
                className="w-full rounded-full bg-primary py-2.5 text-sm font-medium text-white hover:bg-leximpact-button-hover sm:w-1/2"
                onClick={() => router.push('/login')}
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
