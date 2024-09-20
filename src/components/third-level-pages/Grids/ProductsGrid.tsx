import React from "react";
import { useNavigate } from "react-router-dom";
import { Robot, useMediaAsset } from "../../../api/queries";

export const ProductsGrid = (props: { products: Robot[] }) => {
  return (
    <div className="grid grid-cols-4 gap-10">
      {props.products.map((prod) => (
        <Product key={prod.id} product={prod} />
      ))}
    </div>
  );
};

const Product = (props: { product: Robot }) => {
  const { product } = props;

  const { data } = useMediaAsset(product.featured_media) as
    | { guid: { rendered: string } }
    | undefined;

  const isNavigable = React.useMemo(() => {
    const keys = Object.keys(product);
    return keys.length > 2;
  }, [product]);

  const navigate = useNavigate();
  return (
    <div
      className={`${!isNavigable && "cursor-not-allowed opacity-50"} flex aspect-video w-52 select-none flex-col items-center`}
      onClick={() => {
        if (isNavigable) navigate(product.slug);
      }}
    >
      <img className="" src={data?.guid?.rendered} alt={product.slug}></img>
      <span className="font-d-din text-xl font-bold uppercase">
        {product.title.rendered ?? product.id}
      </span>
    </div>
  );
};
