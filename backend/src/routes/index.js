const authController = require("../controllers/auth.controller")

const route = (app) =>{

    //AUTH
    app.post('/api/v1/signup', authController.signup);
    app.post('/api/v1/signin', authController.signin);


    //MESSAGE
    
}

module.exports = route;