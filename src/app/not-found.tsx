import React from "react";
import { FaUserAstronaut } from "react-icons/fa";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-8">
        <FaUserAstronaut className="text-9xl stroke-purple-900" />
        <h1 className="text-4xl font-bold text-center">404 - Not Found</h1>
      </div>
    </>
  );
};

export default NotFound;
