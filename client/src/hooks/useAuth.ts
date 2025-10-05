import { useQuery } from "@tanstack/react-query";
import { isUnauthorizedError } from "@/lib/authUtils";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  // Treat 401 as "not authenticated" rather than error state
  const isAuthenticated = !!user && !error;

  return {
    user,
    isLoading,
    isAuthenticated: error && isUnauthorizedError(error as Error) ? false : isAuthenticated,
  };
}
