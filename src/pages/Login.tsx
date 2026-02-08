// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "@/lib/supabase";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// export default function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     setLoading(true);

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     setLoading(false);

//     if (error) {
//       alert(error.message);
//     } else {
//       navigate("/");
//     }
//   };

//   const handleSignup = async () => {
//     setLoading(true);

//     const { error } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     setLoading(false);

//     if (error) {
//       alert(error.message);
//     } else {
//       alert("Check your email to confirm signup.");
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-background">
//       <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-8 shadow-lg">
//         <h1 className="text-2xl font-semibold text-center">
//           Login to AgenticStock
//         </h1>

//         <Input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <Input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <Button
//           onClick={handleLogin}
//           disabled={loading}
//           className="w-full"
//         >
//           {loading ? "Loading..." : "Login"}
//         </Button>

//         <Button
//           variant="outline"
//           onClick={handleSignup}
//           disabled={loading}
//           className="w-full"
//         >
//           Sign Up
//         </Button>
//       </div>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // If already logged in → redirect
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg("Please fill all fields");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-card p-8 shadow-xl">

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome Back 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            Login to continue to AgenticStock AI
          </p>
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
            placeholder="••••••••"
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

        {/* Login Button */}
        <Button
          onClick={handleLogin}
          disabled={loading}
          className="w-full h-10 rounded-lg"
        >
          {loading ? "Signing in..." : "Login"}
        </Button>

        {/* Divider */}
        <div className="text-center text-sm text-muted-foreground">
          Don’t have an account?
        </div>

        {/* Signup Link */}
        <Link to="/signup">
          <Button
            variant="outline"
            className="w-full h-10 rounded-lg"
          >
            Create Account
          </Button>
        </Link>
      </div>
    </div>
  );
}
