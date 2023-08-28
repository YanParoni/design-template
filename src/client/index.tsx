"use client"
import React from "react";
import { QueryClientProvider, QueryClient} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import StyledComponentsRegistry from "./lib/registry";

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
     <StyledComponentsRegistry>
     {children}
     </StyledComponentsRegistry>
     <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default Providers;
