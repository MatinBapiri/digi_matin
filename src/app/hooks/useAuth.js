import { useAuthContext } from "@/app/providers/AuthProvider";

export const useAuth = () => {
  const { user, loading } = useAuthContext();
  return { user, loading, isLoggedIn: !!user };
};
