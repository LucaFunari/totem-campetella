import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";

const ThirdLevelPageHeader = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const a = queryClient.getQueryState(["robotTypes"]);

  return (
    <header className="flex items-center justify-center bg-white text-black">
      <img
        className="max-w-72 cursor-pointer"
        src="/asset/Logo Campetella.svg"
        alt="log o"
        onClick={() => navigate("/")}
      />
      {a?.status}
    </header>
  );
};

export default ThirdLevelPageHeader;
