import { combineReducers } from '@reduxjs/toolkit';
import resourceReducer from '../resource/resourceSlice';
import resourceTypeReducer from '../resourceType/resourceTypeSlice';
import transactionReducer from '../transaction/transactionSlice';

const combinedReducers = combineReducers({
  resource: resourceReducer,
  resourceType: resourceTypeReducer,
  transaction: transactionReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'app/resetAll') {
    state = undefined;
  }

  return combinedReducers(state, action);
};

export default rootReducer;
