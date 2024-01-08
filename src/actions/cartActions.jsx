
export const handleCartItems=(productDetails,setCartItems,cartItems)=>{
    //  serach if product exists or not 
    const search = cartItems.find((prod) => prod.id === productDetails.id);


    // if quantity of product is zero in cart page  then remove it 
    if (productDetails?.quantity === 0) {
      const removeProduct = cartItems.filter(
        (item) => item.id !== productDetails.id
      );
      setCartItems(removeProduct);
      return;
    }

    // if product already exists in cart just update the product 
    if (search) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === productDetails.id ? productDetails : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, productDetails]);
    }
}