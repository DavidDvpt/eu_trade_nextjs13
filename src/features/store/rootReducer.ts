import { combineReducers } from '@reduxjs/toolkit';
import loadManagerReducer from '../loadManager/loadManagerSlice';
import stockReducer from '../stock/stockSlice';

const combinedReducers = combineReducers({
  // transaction: transactionReducer,
  stock: stockReducer,
  loadManager: loadManagerReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'app/resetAll') {
    state = undefined;
  }

  return combinedReducers(state, action);
};

export default rootReducer;
