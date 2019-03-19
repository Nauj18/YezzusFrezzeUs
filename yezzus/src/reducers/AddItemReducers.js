import {
  ADD_ITEM_SUCCESS
} from '../Screens/Inventory/addTypes';

const INITIAL_STATE = {
  name: '',
  expDate: '',
  quantity: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ITEM_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
