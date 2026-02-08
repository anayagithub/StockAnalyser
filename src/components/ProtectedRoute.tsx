// import { Navigate } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";

// export default function ProtectedRoute({ children }: any) {
//   const { user, loading } = useAuth();

//   if (loading) return null;

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }




import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
