import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function PrivateRoute({ user, children }) {
  useEffect(() => {
    if (!user) {
      toast.error("Please log in to access this page", {
        position: "top-center",
      });
    }
  }, [user]);
  console.log("Inside PrivateRoute, user is:", user);

  if (!user) {
    console.log("No user, redirecting to login");
    return <Navigate to="/login" />;
  }

  return children;
}
