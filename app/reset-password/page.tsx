

// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState, useRef } from "react";
// import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
// import { resetPasswordAction } from "@/app/actions";
// import { useToast } from "@/hooks/use-toast";
// import clsx from "clsx";

// export default function ResetPasswordPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [touched, setTouched] = useState(false);
//   const searchParams = useSearchParams();
//   const { toast } = useToast();
//   const formRef = useRef<HTMLFormElement>(null);

//   // Handle feedback from encodedRedirect
//   useEffect(() => {
//     const type = searchParams.get("type");
//     const message = searchParams.get("message");
//     if (type && message) {
//       toast({
//         title: type === "error" ? "Error" : "Success",
//         description: decodeURIComponent(message),
//         type: type === "error" ? "destructive" : "default",
//       });
//     }
//   }, [searchParams, toast]);

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     if (password !== confirmPassword) {
//       e.preventDefault();
//       toast({
//         title: "Password mismatch",
//         description: "Passwords do not match. Please try again.",
//         type: "destructive",
//       });
//     }
//   };

//   const isMatch = password && confirmPassword && password === confirmPassword;

//   return (
//     <main className="min-h-screen w-full px-4 py-12 sm:px-8 flex items-center justify-center bg-[#f5f5ff] font-montserrat">
//       <div className="w-full max-w-[480px] bg-white border border-gray-200 shadow-lg rounded-3xl p-8 sm:p-10">
//         <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-2">
//           Reset Your Password
//         </h2>
//         <p className="text-sm sm:text-base text-gray-600 mb-8">
//           Enter and confirm your new password.
//         </p>

//         <form
//           action={resetPasswordAction}
//           onSubmit={handleSubmit}
//           ref={formRef}
//           className="space-y-6"
//         >
//           <div className="relative">
//             <label className="block text-base font-normal mb-1">
//               New Password:
//             </label>
//             <input
//               name="password"
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-6 py-4 rounded-[40px] bg-[#EEEEFFB2] border border-primary outline-none pr-12"
//               placeholder="Enter new password"
//             />
//             <span
//               className="absolute top-[52px] right-6 text-gray-500 cursor-pointer"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? (
//                 <IoEyeOutline className="w-5 h-5" />
//               ) : (
//                 <IoEyeOffOutline className="w-5 h-5" />
//               )}
//             </span>
//           </div>

//           <div>
//             <label className="block text-base font-normal mb-1">
//               Confirm Password:
//             </label>
//             <input
//               name="confirmPassword"
//               type={showPassword ? "text" : "password"}
//               value={confirmPassword}
//               onChange={(e) => {
//                 setConfirmPassword(e.target.value);
//                 setTouched(true);
//               }}
//               required
//               className="w-full px-6 py-4 rounded-[40px] bg-[#EEEEFFB2] border border-primary outline-none"
//               placeholder="Confirm new password"
//             />
//             {touched && confirmPassword.length > 0 && (
//               <p
//                 className={clsx(
//                   "mt-2 text-sm font-medium",
//                   isMatch ? "text-green-600" : "text-red-500"
//                 )}
//               >
//                 {isMatch ? "✅ Passwords match!" : "❌ Passwords do not match"}
//               </p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 rounded-full text-[18px] font-bold bg-primary text-secondary border border-black shadow-md hover:opacity-90 transition"
//           >
//             Reset Password
//           </button>
//         </form>

//         <p className="text-center text-sm font-medium text-black/50 mt-8">
//           © 2025 Nilphyx. All rights reserved.
//         </p>
//       </div>
//     </main>
//   );
// }


"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { resetPasswordAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import clsx from "clsx";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const isMatch = password && confirmPassword && password === confirmPassword;

  useEffect(() => {
    const type = searchParams.get("type");
    const message = searchParams.get("message");
    if (type && message) {
      toast({
        title: type === "error" ? "Error" : "Success",
        description: decodeURIComponent(message),
        type: type === "error" ? "destructive" : "default",
      });
    }
  }, [searchParams, toast]);

  const onSubmit = async (data: any) => {
    // Extra guard in case someone bypasses client-side match
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        type: "destructive",
      });
      return;
    }

    // Forward to server action (already using FormData)
    const formData = new FormData();
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    await resetPasswordAction(formData);
  };

  return (
    <main className="min-h-screen w-full px-4 py-12 sm:px-8 flex items-center justify-center bg-[#f5f5ff] font-montserrat">
      <div className="w-full max-w-[480px] bg-white border border-gray-200 shadow-lg rounded-3xl p-8 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-2">
          Reset Your Password
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-8">
          Enter and confirm your new password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <label className="block text-base font-normal mb-1">
              New Password:
            </label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type={showPassword ? "text" : "password"}
              className="w-full px-6 py-4 rounded-[40px] bg-[#EEEEFFB2] border border-primary outline-none pr-12"
              placeholder="Enter new password"
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
            {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                Password must be at least 6 characters.
              </p>
            )}
          </div>

          <div>
            <label className="block text-base font-normal mb-1">
              Confirm Password:
            </label>
            <input
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === password,
              })}
              type={showPassword ? "text" : "password"}
              className="w-full px-6 py-4 rounded-[40px] bg-[#EEEEFFB2] border border-primary outline-none"
              placeholder="Confirm new password"
            />
            {confirmPassword?.length > 0 && (
              <p
                className={clsx(
                  "mt-2 text-sm font-medium",
                  isMatch ? "text-green-600" : "text-red-500"
                )}
              >
                {isMatch ? "✅ Passwords match!" : "❌ Passwords do not match"}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full text-[18px] font-bold bg-primary text-secondary border border-black shadow-md hover:opacity-90 transition"
          >
            Reset Password
          </button>
        </form>

        <p className="text-center text-sm font-medium text-black/50 mt-8">
          © 2025 Nilphyx. All rights reserved.
        </p>
      </div>
    </main>
  );
}
