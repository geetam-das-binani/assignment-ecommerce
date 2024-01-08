import { createContext, useContext, useState, useEffect } from "react";

import { handleCartItems } from "../actions/cartActions";
import { loginAuth } from "../actions/userActions";
import { isLoggedIn, getCartData, getTheme } from "../saveUserCartData/save";
const StateContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(isLoggedIn());
  const [error, setError] = useState(null);
  const [showNotificationMessage, setShowNotificationMessage] = useState("");
  const [cartItems, setCartItems] = useState(getCartData());
  const [theme, setTheme] = useState(getTheme());

  // login  handler
  const handleLogin = async (username, password) => {
    loginAuth(
      username,
      password,
      setUser,
      setError,
      setShowNotificationMessage
    );
  };

  // logout handler
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("Userauth");
    sessionStorage.removeItem("products");
  };
  const clearError = () => setError(null);

  // add items to cart
  const addToCart = (productDetails) => {
    handleCartItems(productDetails, setCartItems, cartItems);
  };

  const removeAllProducts = () => {
    setCartItems([]);
  };

  // remove product if cross icon is clicked on cart page
  const filterSingleProduct = (productId) => {
    const filteredProducts = cartItems.filter((item) => item.id !== productId);
    setCartItems(filteredProducts);
  };

  // if any change in cartItems happens save to storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme ? "dark" : "light"
    );
    localStorage.setItem("ecomtheme", JSON.stringify(theme));
  }, [theme]);
  return (
    <StateContext.Provider
      value={{
        user,
        handleLogin,
        error,
        clearError,
        handleLogout,
        cartItems,
        addToCart,
        removeAllProducts,
        showNotificationMessage,
        setShowNotificationMessage,
        filterSingleProduct,
        theme,
        setTheme,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export { ContextProvider };
export const useStateValue = () => useContext(StateContext);
