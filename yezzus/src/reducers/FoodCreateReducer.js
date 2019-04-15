import {
  FOOD_UPDATE,
  FOOD_CREATE,
  FOOD_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  exp: '',
  quantity: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FOOD_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case FOOD_CREATE:
      return INITIAL_STATE;
    case FOOD_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
