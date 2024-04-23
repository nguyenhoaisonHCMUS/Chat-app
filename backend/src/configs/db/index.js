const  mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/chatapp');

        console.log('successfully');
      } catch (error) {
        handleError(error);
    }
} 

module.exports = {connectToDB}