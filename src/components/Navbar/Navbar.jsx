import React, { Fragment } from "react";
import "./Navbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "../../context/StateContext";
import logo from "../../images/logo.png";
const Navbar = () => {
  const { handleLogout, user, cartItems,theme,setTheme } = useStateValue();

  const handleLogoutUser = () => {
    handleLogout();
    toast.success("Loged Out Successfully", { theme: "dark" });
  };
  const calculateTotalCartAmount = () =>
    cartItems.reduce((a, b) => a + b.price * b.quantity, 0);

  return (
    <Fragment>
      {!user ? null : (
        <nav style={{background:theme ?"rgba(0,0,0,.2)":"",
        color:theme ? 'white':"black"
        }} className="navbar">
          <div className="navbar-container container">
            <ul className="menu-items">
              <li>
                {" "}
                <div className="mode-switch">
                  <label>
                    <input
                      type="checkbox"
                      readOnly
                      onClick={()=>setTheme(!theme)}
                      checked={theme}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </li>
              <li>
                <Link to="/cart">
                  <span>{cartItems.length}</span>
                  <ShoppingCartIcon />
                </Link>
              </li>
              <li>Total : ₹{calculateTotalCartAmount()}</li>
              <li>
                <a
                  className="logout__btn"
                  href="#"
                  onClick={() => handleLogoutUser()}
                >
                  Logout
                </a>
              </li>
            </ul>
            <Link to="/" className="logo">
              <img src={logo} alt="ecommerce logo" />
            </Link>
          </div>
        </nav>
      )}

      <ToastContainer />
    </Fragment>
  );
};

export default Navbar;
