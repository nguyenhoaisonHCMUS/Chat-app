const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const db =require('./configs/db')
const route = require("./routes")
const cors = require('cors')
const app = express();
dotenv.config();

const port = process.env.PORT || 5500;


app.use(cors());
app.use(express.json());  // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

route(app);

db.connectToDB();

app.listen(port, () => { console.log(`app listening at  http://localhost:${port}`)})