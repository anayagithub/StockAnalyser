// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { useNavigate } from "react-router-dom";

// export default function SignUp() {
//   const navigate = useNavigate();

//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     // 1️⃣ Create auth user
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     if (error) {
//       alert(error.message);
//       setLoading(false);
//       return;
//     }

//     const user = data.user;

//     if (user) {
//       // 2️⃣ Insert into profiles table
//       await supabase.from("profiles").insert({
//         id: user.id,
//         full_name: fullName,
//       });
//     }

//     setLoading(false);
//     navigate("/");
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center">
//       <form
//         onSubmit={handleSignUp}
//         className="w-96 space-y-4 rounded-lg border p-6 shadow"
//       >
//         <h2 className="text-xl font-semibold">Create Account</h2>

//         <input
//           type="text"
//           placeholder="Full Name"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           required
//           className="w-full rounded border p-2"
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full rounded border p-2"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="w-full rounded border p-2"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full rounded bg-primary py-2 text-white"
//         >
//           {loading ? "Creating..." : "Sign Up"}
//         </button>
//       </form>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUp() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // If already logged in → redirect
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      setErrorMsg("All fields are required");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    // 1️⃣ Create auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    const createdUser = data.user;

    if (createdUser) {
      // 2️⃣ Insert into profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: createdUser.id,
          full_name: fullName,
          email: email,
        });

      if (profileError) {
        setErrorMsg(profileError.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-card p-8 shadow-xl">

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create Your Account 🚀
          </h1>
          <p className="text-sm text-muted-foreground">
            Join AgenticStock AI today
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">

          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              type="text"
              placeholder="Your Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error */}
          {errorMsg && (
            <p className="text-sm text-red-500 text-center">
              {errorMsg}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-10 rounded-lg"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        {/* Divider */}
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?
        </div>

        {/* Login Link */}
        <Link to="/login">
          <Button
            variant="outline"
            className="w-full h-10 rounded-lg"
          >
            Back to Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
