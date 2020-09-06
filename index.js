const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { User } = require('./models/User');
const config = require('./config/key');
//application/x-www-form-urlencode 로 된 데이터를 분석해서 가져올 수 있음
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
