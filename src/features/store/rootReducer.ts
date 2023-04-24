import { combineReducers } from '@reduxjs/toolkit';

const combinedReducers = combineReducers({});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'app/resetAll') {
    state = undefined;
  }

  return combinedReducers(state, action);
};

export default rootReducer;
