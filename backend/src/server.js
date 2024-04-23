const dotenv = require('dotenv');
const db =require('./configs/db')
const route = require("./routes")
const { app, server} = require('./socket');

dotenv.config();
const port = process.env.PORT || 5500;

route(app);

db.connectToDB();

server.listen(port, () => { console.log(`app listening at  http://localhost:${port}`)})