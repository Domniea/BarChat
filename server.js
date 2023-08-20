const express = require('express')
const app = express()
const { expressjwt: jwt} = require('express-jwt')
const mongoose = require('mongoose')
require("dotenv").config()
const morgan =require('morgan')
const cors = require('cors')

console.log('butts')
mongoose.set('strictQuery', true)

app.use(express.json())
app.use(morgan('dev'))
app.use(
  cors({
    origin: ["https://barchat-production.up.railway.app/"],
    methods: ["GET", "POST", "PUT","DELETE"],
    credentials: true,
    origin: true,
  })
);

mongoose.connect(`${process.env.MONGO_URL}`, () => {
    console.log("Connected to DB");
  });

app.get('/', (req, res) => {
console.log(req)
res.send(
    'Welcome to the Server'
    )
})
app.use('/auth', require('./routes/authRouter'))
app.use('/api', jwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/posts', require('./routes/postRouter'))
app.use('/api/comment', require('./routes/commentRouter'))
app.use('/api/vote', require('./routes/voteRouter'))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === 'UnauthorizedError'){
      res.status(err.status)
    }
    return res.send({errMsg: err.message})
})


app.listen(process.env.PORT, () => {
    console.log(`Server is active on port: ${process.env.PORT}`);
  });