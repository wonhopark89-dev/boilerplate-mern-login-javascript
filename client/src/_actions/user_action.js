import axios from 'axios';
import { LOGIN_USER, REGISTER_USER } from './types';

export function loginUser(dataToSubmit) {
  const request = axios
    .post('/api/users/login', dataToSubmit)
    .then((response) => response.data);

  // return 시키면서 request 를 리듀서로 보내야함
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post('/api/users/register', dataToSubmit)
    .then((response) => response.data);

  // return 시키면서 request 를 리듀서로 보내야함
  return {
    type: REGISTER_USER,
    payload: request,
  };
}
