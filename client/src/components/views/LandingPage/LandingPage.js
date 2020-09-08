import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom'; // history 사용을 위해, history가 react dom 을 이용하기 때문

function LandingPage(props) {
  const onClickHandler = () => {
    Axios.get('/api/users/logout').then((response) => {
      console.log(response.data);
      if (response.data.success) {
        props.history.push('/login');
      } else {
        alert('로그아웃 실패 !');
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <h2>시작 페이지</h2>

      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default withRouter(LandingPage);
