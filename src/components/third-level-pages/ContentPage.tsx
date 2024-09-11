import React from "react";
import { useParams } from "react-router-dom";

const ContentPage = () => {
  const a = useParams();
  console.debug(a);
  return <div></div>;
};

export default ContentPage;
