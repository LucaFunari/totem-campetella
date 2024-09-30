import React from "react";
import { useNavigate } from "react-router-dom";
import { Robot, useSingleAsset } from "../../../api/queries";

export const ProductsGrid = (props: { products: Robot[] }) => {
  return (
    <div className="grid grid-cols-4 gap-20 overflow-scroll pb-20">
      {props.products.map((prod) => (
        <Product key={prod.id} product={prod} />
      ))}
    </div>
  );
};

const Product = (props: { product: Robot }) => {
  const { product } = props;

  const { asset, isLoading } = useSingleAsset(product?.featured_media);

  const isNavigable = React.useMemo(() => {
    const keys = Object.keys(product);
    return keys.length > 2;
  }, [product]);

  const imageUrl = React.useMemo(() => {
    return asset?.source_url ?? asset?.guid.rendered;
  }, [asset]);

  const [loaded, setLoaded] = React.useState(false);

  const navigate = useNavigate();
  return (
    <div
      className={`${!isNavigable && "cursor-not-allowed opacity-50"} flex w-[26rem] select-none flex-col items-center justify-between`}
      onClick={() => {
        if (isNavigable) navigate(product.slug);
      }}
    >
      <div className="flex aspect-[1.27] w-full">
        {isLoading ? (
          <div className="h-full w-full" />
        ) : imageUrl ? (
          <img
            onLoad={() => setLoaded(true)}
            className={`aspect-video w-full object-cover transition-opacity ${loaded ? "opacity-100" : "opacity-0"} `}
            src={imageUrl}
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full rounded-lg bg-white bg-opacity-25"></div>
        )}
      </div>
      <span className="font-d-din text-[2.5rem]/[3.5rem] font-bold uppercase">
        {product.title.rendered ?? product.id}
      </span>
    </div>
  );
};
