import React from "react";
import { useStateValue } from "../../context/StateContext";
import "./Cart.css";
import { Link } from "react-router-dom";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify'
const Cart = () => {
  const { cartItems, addToCart, removeAllProducts ,filterSingleProduct,theme} = useStateValue();
  const calculateTotalCartAmount = () =>
    cartItems?.reduce((a, b) => a + b.price * b.quantity, 0);
  const increaseQuantity = (prodDetails) => {
    const newQuantity = prodDetails.quantity + 1;
    addToCart({ ...prodDetails, quantity: newQuantity });
  };
  const decreaseQunatity = (prodDetails) => {
    const newQuantity = prodDetails.quantity - 1;
    addToCart({ ...prodDetails, quantity: newQuantity });
  };
  const handleRemoveAllProducts=()=>{
    removeAllProducts()
    toast.success('Removed All Products',{theme:'dark',autoClose:3000})
  }
  if (cartItems.length > 0) {
    return (
      <div className="cart__container">
        <div className="card">
          <div className="row">
            <div
            style={{
              background:theme ?" #333333":'white',
              color:theme ?" white":'black'
            }}
            className="cart">
              <div className="title">
                <div className="row">
                  <div className="col">
                    <h4>
                      <b>Your Cart</b>
                    </h4>
                  </div>
                  <button
                    onClick={()=>handleRemoveAllProducts()}
                    className="col remove__all__btn"
                  >
                    Remove All
                  </button>
                </div>
              </div>
              <div className="scroll">
                {cartItems?.map((elem) => (
                  <div key={elem.id} className="row">
                    <div className="row row__items main ">
                      <div className="col-2">
                        <img className="img__fluid" src={elem?.images[0]} />
                      </div>
                      <div className="col">
                        <div className="row ">{elem.title}</div>
                      </div>
                      <div className="col">
                        <button onClick={() => decreaseQunatity(elem)}>
                          -
                        </button>
                        <input readOnly type="number" value={elem.quantity} />
                        <button onClick={() => increaseQuantity(elem)}>
                          +
                        </button>
                      </div>
                      <div className="col">
                        {elem.price} 
                        <span onClick={()=>filterSingleProduct(elem.id)

                        } className="close">X</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="back__to__shop">
                <Link to="/" >
                  Back to shop
                </Link>
              </div>
            </div>
            <div className="summary">
              <div>
                <h5>
                  <b>Summary</b>
                </h5>
              </div>
              <hr />
              <div className="row">
                <div
                  className="col"
                  style={{ paddingLeft: "0", marginTop: ".5rem" }}
                >
                  ITEMS ({cartItems.length})
                </div>
              </div>

              <div
                className="row"
                style={{
                  borderTop: "1px solid rgba(0,0,0,.1)",
                  padding: " 2vh 0",
                }}
              >
                <div className="col">TOTAL </div>
                <div className="col">
                  ₹{calculateTotalCartAmount()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    );
  } else
    return (
      <div className="empty__cart">
        <RemoveShoppingCartIcon />
        <Link to="/">View Products</Link>
      </div>
    );
};
export default Cart;
