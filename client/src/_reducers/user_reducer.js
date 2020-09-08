import { LOGIN_USER, REGISTER_USER, AUTH_USER } from '../_actions/types';

export default function (state = {}, action) {
  // 타입이 여러개 될 수 있으니까
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload }; // 백엔드에서 넘겨주는 데이터를 userData 라는 이름으로 받는것임
    default:
      return state;
  }
}
