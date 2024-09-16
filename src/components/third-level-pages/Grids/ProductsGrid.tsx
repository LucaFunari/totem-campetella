import React from "react";

export const ProductsGrid = (props: { products: any[] }) => {
  return (
    <div className="grid grid-cols-4 gap-10">
      {props.products.map((prod) => (
        <Product key={prod.id} product={prod} />
      ))}
      {props.products.map((prod) => (
        <Product key={prod.id} product={prod} />
      ))}
      {props.products.map((prod) => (
        <Product key={prod.id} product={prod} />
      ))}
    </div>
  );
};

const Product = (props: { product: any }) => {
  return <div className="aspect-video w-52 border-2">{props.product.id} </div>;
};
