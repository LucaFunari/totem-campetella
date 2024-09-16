import React from "react";
import { Link, redirect, useNavigate, useRouteError } from "react-router-dom";
import SimpleButton from "./reusable/SimpleButton";

const ErrorPage = () => {
  const error = useRouteError() as {
    status: number;
    statusText: string;
    internal: boolean;
    data: string;
  };
  const navigate = useNavigate();

  React.useEffect(() => {
    console.debug(error);
  }, [error]);
  return (
    <div className="radial-bg flex h-dvh w-full flex-col items-start justify-center gap-4 p-6 text-left text-white">
      <>
        <h3 className="text-2xl font-bold">
          {error.status} {error.statusText}
        </h3>
        <code className="w-full">{error.data}</code>

        <br></br>
        <div className="grid w-full grid-cols-2">
          <SimpleButton fn={() => navigate("..")}>indietro</SimpleButton>
          <SimpleButton fn={() => navigate("/")}>Home</SimpleButton>
        </div>
      </>
    </div>
  );
};

export default ErrorPage;
