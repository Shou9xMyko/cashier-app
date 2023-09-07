import {
  ADD_TO_CART,
  CLEAR_CART,
  FETCH,
  FETCH_ALL_REPORT,
  LOGIN,
  REGISTER,
} from "../action/action";

const initialState = {
  data: null,
  add_cart: [],
  clear_cart: false,
  all_report: null,
  register_status: false,
  login_data: null,
};

const CashierReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        data: action.data,
      };

    case ADD_TO_CART:
      return {
        ...state,
        add_cart: action.payload,
      };

    case CLEAR_CART:
      return {
        ...state,
        clear_cart: action.payload,
      };

    case FETCH_ALL_REPORT:
      return {
        ...state,
        all_report: action.data,
      };

    case REGISTER:
      return {
        ...state,
        register_status: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        login_data: action.payload,
      };

    default:
      return state;
  }
};

export default CashierReducer;
