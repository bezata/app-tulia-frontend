"use client";
import React from "react";
import { IMainLayout } from "./IMainLayout";

const MainLayout: React.FC<IMainLayout> = ({ children }) => {
  return (
    <>
      {/* NOTE: header section */}
      <main className="container mx-auto">{children}</main>
    </>
  );
};

export default MainLayout;
