import { GET_USER, GET_PRODUCTS, UPDATE_COINS } from "./constants";
const initialState = {
  user: [],
  products: [],
  redeemHistory: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case UPDATE_COINS:
      return {
        ...state,
        user: (action.operator === 'sum' ? {...state.user, points: state.user.points + action.payload} : {...state.user, points: state.user.points - action.payload})
      }
    default:
      return state;
  }
};
export default rootReducer;
