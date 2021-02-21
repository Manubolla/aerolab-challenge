import { GET_USER, GET_PRODUCTS, UPDATE_COINS, TOKEN } from "./constants";
import axios from "axios";

export const getProducts = () => async (dispatch) => {
  const products = await axios.get(
    "https://coding-challenge-api.aerolab.co/products",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  if (products) {
    dispatch({ type: GET_PRODUCTS, payload: products.data });
  }
};
export const getUser = () => async (dispatch) => {
  const user = await axios.get(
    "https://coding-challenge-api.aerolab.co/user/me",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  if (user) {
    dispatch({ type: GET_USER, payload: user.data });
  }
};
export const redeemProduct = (productId, amount) => async (dispatch) => {
  const redeem = await axios.post(
    "https://coding-challenge-api.aerolab.co/redeem",
    { productId },
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  if (redeem) {
    dispatch({ type: UPDATE_COINS, payload: amount, operator: "substract" });
    alert("Nice!");
  }
};
export const addCoins = () => async (dispatch) => {
  const points = await axios.post(
    "https://coding-challenge-api.aerolab.co/user/points",
    { amount: 5000 },
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  if (points) {
    dispatch({ type: UPDATE_COINS, payload: 5000, operator: "sum" });
    alert("5000 coins added!");
  }
};
