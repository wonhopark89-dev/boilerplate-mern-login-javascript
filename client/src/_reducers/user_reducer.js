import { LOGIN_USER } from '../_actions/types';

export default function (state = {}, action) {
  // 타입이 여러개 될 수 있으니까
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    default:
      return state;
  }
}
