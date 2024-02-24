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

  const [tick, setTick] = useState(false);

  const [products, setProducts] = useState([]);

  const [won, setWon] = useState(null);

  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 0,
    imageUrl: "",
  });

  const onClick = () => {
    setToggle(!toggle);

    let randomProduct: number;

    do {
      randomProduct = Math.floor(Math.random() * products.length);
    } while (products[randomProduct].quantity === 0);

    const updatedProducts = [...products];
    updatedProducts[randomProduct].quantity -= 1;
    setProducts(updatedProducts);

    setWon(products[randomProduct]);
  };

  const action = () => {
    setProducts((previousItems) => [...previousItems, newItem]);
    setNewItem({ name: "", quantity: 0, imageUrl: "" });
  };

  const removeItem = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const toggleInfinity = () => {
    setNewItem((prevItem) => ({
      ...prevItem,
      quantity: prevItem.quantity === Infinity ? 1 : Infinity,
    }));
  };

  const cleartext = () => {
    setNewItem({ ...newItem, name: "" });
  };

  const tips = () => {
    setTick(!tick);
  };

  return (
    <div id="container">
      <p className="lover">
        <b>Customize your own lucky draw</b>
      </p>

      {toggle ? (
        ""
      ) : (
        <div
          onClick={tips}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              tips();
            }
          }}
          role="button"
          tabIndex={0}
        >
          <img className="mainimg" src="/luckydraw.png" alt="Wheel" />
        </div>
      )}

      {tick ? (
        <div className="tipsContainer">
          <h2 className="tips">
            This is a lucky draw generator that you can used for various
            purposes. <br />
            You can add your items and their quanitties to your list and you can
            remove it back too.
            <br /> It will generate you the item you win randomly. And
            displaying the <br />
            quantities of items left.For items withunlimited quanitties, please
            click the button &lsquo;Unlimited&apos;.
          </h2>
        </div>
      ) : (
        ""
      )}

      {products.map((product, index) => (
        <p key={index}>
          {product.name} ={" "}
          <span className="mydiv">
            {product.quantity === 0
              ? "Out of stock"
              : product.quantity === Infinity
              ? "Unlimited Items left"
              : product.quantity > 1
              ? product.quantity + " items left"
              : product.quantity + " item left"}{" "}
            <button className="deletebutton" onClick={() => removeItem(index)}>
              {" "}
              X{" "}
            </button>
          </span>
        </p>
      ))}
      <div className="Adder">
        <label>
          New Item:
          <input
            type="text"
            placeholder="name..."
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <div>
            <button onClick={cleartext} className="infinitybutton">
              Clear
            </button>
          </div>
        </label>

        {newItem.quantity === Infinity ? (
          <div>
            <div className="thistext">
              Quantity: <br />
              {"           "}
              <br />
              <div className="thistext2">Unlimited</div>
            </div>
            <button onClick={toggleInfinity} className="infinitybutton">
              Limited
            </button>
          </div>
        ) : (
          <label className="quantity-input-container">
            Quantity:
            <input
              type="number"
              min="1"
              value={newItem.quantity}
              onChange={(e) =>
                setNewItem({ ...newItem, quantity: Number(e.target.value) })
              }
            />
            <div>
              <button onClick={toggleInfinity} className="infinitybutton">
                Unlimited
              </button>
            </div>
          </label>
        )}
        {!newItem.name || !newItem.name.trim() || newItem.quantity === 0 ? (
          <button className="addbutton"> Add</button>
        ) : (
          <button className="addbutton" onClick={action}>
            {" "}
            Add
          </button>
        )}
      </div>
      <div className="itemimage">
        {toggle ? (
          won === null ? null : (
            <div>
              <img className="secimg" src="/congratulations.png" alt="" />
              <div className="resulttext"> You got {won.name} </div>
            </div>
          )
        ) : (
          ""
        )}
      </div>
      {/* <button className="spinbutton" onClick={onClick} id="button">
        {toggle ? "close" : "spin"}
      </button> */}
      <div
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClick();
          }
        }}
        role="button"
        tabIndex={0}
      >
        {toggle ? (
          <img className="repeat" src="/repeat.png" alt=""></img>
        ) : (
          <img className="buttonimg" src="/button.png" alt="" />
        )}
      </div>
    </div>
  );
}
