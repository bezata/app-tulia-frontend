"use client";
import React from "react";
import { IMainLayout } from "./IMainLayout";
import { ThemeProvider } from "../ThemeProvider/ThemeProvider";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const MainLayout: React.FC<IMainLayout> = ({ children }) => {
  return (
    <>
      {/* NOTE: header section */}
      <Header />
      {/* NOTE: main section */}
      <main className=" dark container mx-auto min-h-[calc(100vh-8rem)]">
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
      {/* NOTE: footer section */}
      <Footer />
    </>
  );
};

export default MainLayout;
