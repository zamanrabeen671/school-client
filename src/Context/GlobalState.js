/* eslint-disable no-unused-vars */
import { createContext, useReducer } from "react";
import reducers from "./Reducer";

export const DataContext = createContext();

const user = sessionStorage.getItem('user') && JSON.parse(sessionStorage.getItem('user'))
export const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    auth: user,
    cart: [],
  };
  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart } = state;

  // useEffect(() => {
  //   const __next_cart01__app = JSON.parse(
  //     localStorage.getItem("__next_cart01__app")
  //   );

  //   if (__next_cart01__app)
  //     dispatch({ type: "ADD_CART", payload: __next_cart01__app });
  // }, []);

  // add cart into localstorage
  // useEffect(() => {
  //   localStorage.setItem("__next_cart01__app", JSON.stringify(cart));
  // }, [cart]);

  // useEffect(() => {
  //   const firstLogin = localStorage.getItem("firstLogin");
  //   if (firstLogin) {
  //     getData("auth/accessToken").then((res) => {
  //       if (res.err) return localStorage.removeItem("firstLogin");
  //       dispatch({
  //         type: "AUTH",
  //         payload: {
  //           token: res.access_token,
  //           user: res.user,
  //         },
  //       });
  //     });
  //   }
  // }, []);

  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  );
};
