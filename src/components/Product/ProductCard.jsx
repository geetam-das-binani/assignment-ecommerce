import React, { useState } from "react";
import { Rating } from "@mui/material";
import { useStateValue } from "../../context/StateContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductCard.css";

export default function ProductCard({ title, price, images, rating, id }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, theme } = useStateValue();
  const options = {
    value: rating,
    precision: 0.5,
    size: "small",
    readOnly: true,
   sx:{
    color:theme ? "tomato" :"#faaf00"
   }
  };
  const handleAddToCart = () => {
    const singleProductDetails = {
      id,
      title,
      price,
      images,
      rating,
      quantity,
    };
    addToCart(singleProductDetails);
    toast.success("Item added to cart", {
      theme: "dark",
    });
  };
  return (
    <div
      style={{
        border: theme ? "2px solid white" : "",
        padding: theme ? ".2rem" : "",
        borderRadius: theme ? "10px" : "",
      }}
      className="product__card"
    >
      <img src={images[0]} alt={title} />
      <p style={{ color: theme ? "white" : "" }}>{title}</p>
      <div>
        <Rating {...options} />
      </div>
      <span>₹{price}</span>
      <div className="cart__input">
        <button
          onClick={() => {
            if (quantity <= 1) return;
            setQuantity(quantity - 1);
          }}
        >
          -
        </button>
        <input type="number" readOnly value={quantity} />
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>
      <button onClick={handleAddToCart} className="cart__btn">
        Add to cart
      </button>
    </div>
  );
}
