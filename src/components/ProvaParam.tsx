import React from "react";
import { useLoaderData } from "react-router-dom";

export const loadParam = async ({
  params,
}: {
  params: { testParameter: string };
}) => {
  console.debug("aooooooo");
  setTimeout(() => {
    return params.testParameter;
  }, 1e3);
};

const ProvaParam = () => {
  const a = useLoaderData();

  console.debug(a);
  return <div>ProvaParam</div>;
};

export default ProvaParam;
