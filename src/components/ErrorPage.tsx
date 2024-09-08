import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div>
      <h2>Errore!</h2>
      <br />
      <i>{error.statusText}</i>
    </div>
  );
};

export default ErrorPage;
