import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

const ClerkAuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
          logoImageUrl: "/icons/logo.svg",
        },
        variables: {
          colorText: "#fff",
          colorPrimary: "#0E78F9",
          colorBackground: "#1C1F2E",
          colorInputBackground: "#252A41",
          colorInputText: "#fff",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
};
export default ClerkAuthProvider;
