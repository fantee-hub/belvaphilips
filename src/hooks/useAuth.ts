import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

interface AuthStatus {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAdminAuth = (): AuthStatus => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const cookies = new Cookies();

  useEffect(() => {
    const checkAuth = async () => {
      const adminToken = cookies.get("admin_token");

      if (!adminToken) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  return { isAuthenticated, isLoading };
};

export const useUserAuth = (): AuthStatus => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const cookies = new Cookies();

  useEffect(() => {
    const checkAuth = async () => {
      const userToken = cookies.get("user_token");

      if (!userToken) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  return { isAuthenticated, isLoading };
};
