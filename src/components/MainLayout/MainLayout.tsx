"use client";
import React from "react";
import { IMainLayout } from "./IMainLayout";
import { ThemeProvider } from "../ThemeProvider/ThemeProvider";
import Header from "../Header/Header";

const MainLayout: React.FC<IMainLayout> = ({ children }) => {
  return (
    <>
      {/* NOTE: header section */}
      <Header />
      <main className="container mx-auto">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          //   themes={["light", "dark"]}
        >
          {children}
        </ThemeProvider>
      </main>
    </>
  );
};

export default MainLayout;
