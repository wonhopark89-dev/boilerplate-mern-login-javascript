const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saleRounds = 10;

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

const User = mongoose.model('User', userSchema);

module.exports = { User };
