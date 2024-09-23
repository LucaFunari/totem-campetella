import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import SimpleButton from "./reusable/SimpleButton";

const ErrorPage = () => {
  const error = useRouteError() as {
    status: number;
    statusText: string;
    internal: boolean;
    data: string;
  };
  const navigate = useNavigate();

  return (
    <div className="absolute left-1/2 aspect-[9/16] h-dvh -translate-x-1/2 overflow-hidden bg-white">
      <div className="radial-bg flex h-full w-full flex-col items-start justify-center gap-4 p-6 text-left text-white">
        <>
          <h3 className="text-2xl font-bold">
            {error.status} {error.statusText}
          </h3>
          <code className="w-full">{error.data}</code>

          <br></br>
          <div className="">
            <SimpleButton fn={() => navigate("/")}>
              Torna Alla Home
            </SimpleButton>
          </div>
        </>
      </div>
    </div>
  );
};

export default ErrorPage;
