const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saleRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 30,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    trim: true,
    unique: 1,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre('save', function (next) {
  var user = this; // userSchema 를 가리킴
  // 비밀번호가 변경될때만 비밀번호만 암호화를 해야한다
  if (user.isModified('password')) {
    // 비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saleRounds, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        // ( plain passwrod : 내가 입력한 패스워드)
        if (err) {
          return next(err); // 에러가 있으면 save 를 콜하는 부분에 에러가 넘어감
        }
        user.password = hash; // 성공하면 hash 값을 비밀번호에 할당
        next();
      }); //
    });
  } else {
    next();
  }
});

// custom methods
userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plain password : 내가 입력한 패스워드
  // 암호화된 비밀번호와 체크를 해야함
  // 암호된 패스워드를 복호화 할수 없기때문에 plain password 를 암호화해서 비교한다
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err); // callback 으로 에러를 넘겨줌
    }
    cb(null, isMatch); // isMatch type is boolean
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  // jsonwebtoken 을 이용해서 토큰생성
  // sign 함수는 plain object 를 기대하기 떄문에 hexString 으로 넘겨준다?
  var token = jwt.sign(user._id.toHexString(), 'mySecret'); // 토큰과 함께 생성하는 값도 기억해야한다 !
  user.token = token;
  user.save(function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user); // argu : err, info
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;
  // 토큰을 decode 한다.
  jwt.verify(token, 'mySecret', function (err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 토큰과 DB 에 보관된 토큰이 일치하는지 확인

    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) {
        return cb(err);
      }
      cb(null, user);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
