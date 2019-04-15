import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import FoodCreateReducer from './FoodCreateReducer';
import FoodReducer from './FoodReducer';

export default combineReducers({
  auth: AuthReducer,
  foodCreateForm: FoodCreateReducer,
  food: FoodReducer
});
