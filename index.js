const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('./models/User');
const config = require('./config/key');

//application/x-www-form-urlencode 로 된 데이터를 분석해서 가져올 수 있음
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

//mongodb+srv://wonhopark89:<password>@boilerplate-react-node.tbh99.mongodb.net/<dbname>?retryWrites=true&w=majority
const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', (req, res) => {
  // 회원가입할때 필요한 정보를 client 에서 가져온다
  // 그것들은 데이터베이스에 넣어준다
  const user = new User(req.body); // parser 가 있기 때문,
  user.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err }); // 실패했을 때 json 데이터로 응답
    }
    return res.status(200).json({ success: true });
  });
});

app.post('/login', (req, res) => {
  // 요청한 이메일이 데이터베이스에 있는지 찬는다
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다.',
      });
    }

    // 요청한 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 틀렸습니다. ',
        });
      }
      // 비밀번호까지 맞다면 토큰을 생성하기
      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).send(err);
        }
        // 토큰을 저장한다. 어디에 ? 쿠키, 로컬스토리지 등
        // 이름이 x_auth 인 쿠키에 저장함
        res.cookie('x_auth', user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
