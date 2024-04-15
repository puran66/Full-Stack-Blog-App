require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 9000;
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dbConncet = require('./db/dbConnect');
const routes = require('./routes');
const cors = require('cors');


app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true // Allow sending cookies along with the request
}));

// parse the body //

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// db connect //

dbConncet();

// routes //
app.use('/v1', routes);

// create server  and listen on a specific port //

http.createServer(app).listen(port, () => {
  console.log("server started");
})