const express = require('express');
const app = express();
const port = 3000;

//mongodb+srv://wonhopark89:<password>@boilerplate-react-node.tbh99.mongodb.net/<dbname>?retryWrites=true&w=majority
const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://wonhopark89:dnjsgh1234!@boilerplate-react-node.tbh99.mongodb.net/<dbname>?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
