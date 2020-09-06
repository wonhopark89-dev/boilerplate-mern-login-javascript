const { User } = require('./models/Users');

let auth = (req, res, next) => {
  // 인증처리 하는 곳
  // 클라이언트 쿠키에서 토큰을 가져온다. ( 쿠키에 저장했으니까 )
  let token = req.cookies.x_auth;
  // 토큰을 복호화 한 후 유저를 찾는다
  User.findByToken(token, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      return res.json({ isAuth: false, error: true });
    }
    req.token = token;
    req.user = user;
    next();
  });
  // 유저가 있으면 인증 Ok
  // 유저가 없으면 인증 No
};

module.exports = { auth };
