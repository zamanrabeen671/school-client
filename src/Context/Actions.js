export const ACTIONS = {
    NOTIFY: "NOTIFY",
    AUTH: "AUTH",
    ADD_CART: "ADD_CART",
  };
  
  export const addToCart = (product, cart) => {
    
    const check = cart.every((item) => {
      return item._id !== product._id;
    });
    if (!check) {
      return {
        type: "NOTIFY",
        payload: { error: "This product already added into the cart" },
      };
    }
  
    return { type: "ADD_CART", payload: [...cart, { ...product, quantity: 1 }] };
  };
  
//   export const decrease = (data, id) => {
//     const newData = [...data];
//     newData.forEach((item) => {
//       if (item._id === id) item.quantity -= 1;
//     });
//     return { type: "ADD_CART", payload: newData };
//   };
  
//   export const increase = (data, id) => {
//     const newData = [...data];
//     newData.forEach((item) => {
//       if (item._id === id) item.quantity += 1;
//     });
//     return { type: "ADD_CART", payload: newData };
//   };
  
  export const deleteItem = (data, id, type) => {
    const newData = data.filter((item) => item._id !== id);
    return { type, payload: newData };
  };
  