import React from "react";
import { useNavigate } from "react-router-dom";

const NotExisting = () => {
  const navigate = useNavigate();
  return (
    <div>
      Prodotto non esistente
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
};

export default NotExisting;
