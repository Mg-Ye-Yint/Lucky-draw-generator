import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";

import "../styles.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [toggle, setToggle] = useState(false);

  const [product, setProduct] = useState([
    {
      name: "Apple Watch",
      quantity: 1,
      imageUrl: "/Photo-1 (1).png",
    },
    {
      name: "Vaccum Cleaner",
      quantity: 2,
      imageUrl: "/Photo-2 (1).png",
    },
    {
      name: "Baht 1,100",
      quantity: Infinity,
      imageUrl: "/Photo-3 (1).png",
    },
  ]);

  const [won, setWon] = useState(null);

  const onClick = () => {
    setToggle(!toggle);

    let randomProduct: number;

    do {
      randomProduct = Math.floor(Math.random() * product.length);
    } while (
      product[randomProduct].quantity === 0
      //(photoIndex === 0 && displayCount[photoIndex] >= 1) || (photoIndex === 1 && displayCount[photoIndex] >= 2)
    );

    const updatedProduct = [...product];
    updatedProduct[randomProduct].quantity -= 1;
    setProduct(updatedProduct);

    setWon(product[randomProduct]);
  };

  //console.log(won);

  return (
    <div id="container">
      <p>Which reward will you get?</p>

      <img id="chart" src="/chart (1).png" alt="Wheel" />

      <p id="appleWatch">
        Apple Watch ={" "}
        <span id="appleWatchCount">
          {product[0]?.quantity === 0
            ? "Out of stock"
            : product[0]?.quantity + " item left"}{" "}
        </span>{" "}
      </p>
      <p id="vacuumCleaner">
        Vaccum Cleaner ={" "}
        <span id="vacuumCleanerCount">
          {product[1]?.quantity === 0
            ? "Out of stock"
            : product[1]?.quantity + " item left"}
        </span>{" "}
      </p>
      <p>1,100 Baht = unlimited item left</p>

      {toggle ? (
        won === null ? null : (
          <img src={won.imageUrl} alt=""></img>
        )
      ) : (
        ""
      )}

      <button onClick={onClick} id="button">
        {toggle ? "close" : "spin"}
      </button>
    </div>
  );
}
