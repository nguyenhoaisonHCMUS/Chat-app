const authController = require("../controllers/auth.controller");
const messageController = require("../controllers/message.controller");
const authenToken = require('../midlewares/index');

const route = (app) =>{

    //AUTH
    app.post('/api/v1/signup', authController.signup);
    app.post('/api/v1/signin', authController.signin);
    app.post('/api/v1/refresh-token', authController.requestRefreshToken);
    app.post('/api/v1/logout', authController.logout);

    //MESSAGE
    app.post('/api/v1/send-message/:id', authenToken, messageController.sendMessage)
    app.get('/api/v1/get-messages/:id', authenToken, messageController.getMessages)
}

module.exports = route;