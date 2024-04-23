const authController = require("../controllers/auth.controller")
const authenToken = require('../midlewares/index');

const route = (app) =>{

    //AUTH
    app.post('/api/v1/signup', authController.signup);
    app.post('/api/v1/signin', authController.signin);
    app.post('/api/v1/refresh-token', authController.requestRefreshToken);


    //MESSAGE
    
}

module.exports = route;