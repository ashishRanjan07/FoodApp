import {LOGIN, SAVE, saveData} from '../action/Action';

const initialState = {
  isLoggedIn: 'No',
  saveData: 'null',
};

// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case SAVE:
      return {
        ...state,
        saveData: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
