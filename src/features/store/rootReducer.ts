import { combineReducers } from '@reduxjs/toolkit';
import globalReducer from '../global/globalSlice';
import itemSearchEngineReducer from '../itemSearchEngine/itemSearchEngineSlice';
import stockReducer from '../stock/stockSlice';
import transactionReducer from '../transaction/transactionSlice';

const combinedReducers = combineReducers({
  itemSearchEngine: itemSearchEngineReducer,

  transaction: transactionReducer,
  stock: stockReducer,
  global: globalReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'app/resetAll') {
    state = undefined;
  }

  return combinedReducers(state, action);
};

export default rootReducer;
