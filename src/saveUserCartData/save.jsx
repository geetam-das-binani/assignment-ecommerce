export const isLoggedIn=()=>{
  const user=  localStorage.getItem("Userauth") 
  return user ? user :""
}
export const getCartData=()=>{
    const cartItems=localStorage.getItem("cart")
    
    return cartItems? JSON.parse(cartItems) : []
}

export const getTheme=()=>{
  const theme=localStorage.getItem('ecomtheme')
  return theme ? JSON.parse(theme) :false
}