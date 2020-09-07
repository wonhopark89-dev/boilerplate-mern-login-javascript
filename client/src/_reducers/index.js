import { combineReducers } from 'redux';
import user from './user_reducer'; // default 값이라서 원하는 변수명으로
const rootReducer = combineReducers({
  // reducer 들을 하나로 묶어줌
  user,
});

export default rootReducer;
