import React from "react";
import { useNavigate } from "react-router-dom";

export const ProductsGrid = (props: { products: any[] }) => {
  return (
    <div className="grid grid-cols-4 gap-10">
      {props.products.map((prod) => (
        <Product key={prod.id} product={prod} />
      ))}
    </div>
  );
};

const Product = (props: { product: any }) => {
  const isNavigable = React.useMemo(() => {
    const keys = Object.keys(props.product);
    return keys.length > 2;
  }, [props.product]);

  const navigate = useNavigate();
  return (
    <div
      className={`${!isNavigable && "cursor-not-allowed opacity-50"} flex aspect-video w-52 flex-col items-center`}
      onClick={() => {
        if (isNavigable) navigate(props.product.id);
      }}
    >
      <img className="" src={props.product.thumbnail}></img>
      <span className="font-d-din text-xl font-bold uppercase">
        {props.product.title ?? props.product.id}
      </span>
    </div>
  );
};
