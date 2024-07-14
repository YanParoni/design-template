"use client";
import React, { useEffect } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { ThemeProvider } from "next-themes";
import { useAuthStore } from "client/store";
import jwt from "jsonwebtoken";
import Alert from "@ui/components/molecules/alert";

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(new QueryClient());
  const { login, setActiveState } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return setActiveState("default");
    const userProfile = jwt.decode(token) as any;
    login(token, userProfile);
    setActiveState("logged");
  }, [login, setActiveState]);

  return (
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>
        <ThemeProvider>
          <Alert />
          {children}
        </ThemeProvider>
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}

export default Providers;
