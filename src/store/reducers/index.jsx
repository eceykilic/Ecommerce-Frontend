import { combineReducers } from "redux";
import globalReducer from "./globalReducer";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import shoppingCartReducer from "./shoppingCartReducer"
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
  products: productReducer,
  shoppingCart: shoppingCartReducer,
  orderReducer: orderReducer
});

export default rootReducer;
