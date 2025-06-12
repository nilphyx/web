// import React from "react";
// import { forgotPasswordAction } from "@/app/actions";
// import { FormMessage, Message } from "@/components/form-message";
// import { SubmitButton } from "@/components/submit-button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Link from "next/link";
// import { SmtpMessage } from "../smtp-message";

// export default async function ForgotPassword(props: {
//   searchParams: Promise<Message>;
// }) {
//   const searchParams = await props.searchParams;
//   return (
//     <>
//       <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
//         <div>
//           <h1 className="text-2xl font-medium">Reset Password</h1>
//           <p className="text-sm text-secondary-foreground">
//             Already have an account?{" "}
//             <Link className="text-primary underline" href="/sign-in">
//               Sign in
//             </Link>
//           </p>
//         </div>
//         <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
//           <Label htmlFor="email">Email</Label>
//           <Input name="email" placeholder="you@example.com" required />
//           <SubmitButton formAction={forgotPasswordAction}>
//             Reset Password
//           </SubmitButton>
//           <FormMessage message={searchParams} />
//         </div>
//       </form>
//       <SmtpMessage />
//     </>
//   );
// }

// const ForgotPassword = () => {
//   return <div>ForgotPassword</div>;
// };

"use client";

import React from "react";
import { useState } from "react";
import { forgotPasswordAction } from "@/app/actions";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("email", email);

    await forgotPasswordAction(formData);
    setIsSubmitting(false);
    router.push("/login");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#cdd3e0] rounded-lg p-8 w-[90%] max-w-md relative text-center">
        {/* Close Button */}
        <button
          //   onClick={() => window.history.back()}
          onClick={() => router.push("/login")}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary text-white text-lg flex items-center justify-center"
        >
          ×
        </button>

        {/* Logo */}
        <img
          src="/logo.png"
          alt="Leximpact Logo"
          className="mx-auto mb-4 w-14 h-16"
        />

        {/* Title */}
        {/* <h2 className="text-2xl font-bold text-black mb-1">Leximpact</h2> */}

        <h3 className="text-xl font-semibold text-black mb-4">
          Reset Your Password
        </h3>
        <p className="text-sm text-black mb-6">
          Enter your registered email address and a password reset link will be
          sent to you.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-6 py-4 rounded-full border border-primary outline-none"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-full bg-primary text-secondary font-semibold text-lg"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
