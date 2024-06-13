//FILENAME : db.js
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

require('dotenv').config();

//Test Again
const InitiateMongoServer = async () => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        tls: true,
    };


    //const connectionUri = 'mongodb+srv://dhanabalt:S9nlAP4ti9qOINBE@arima.uekqxpb.mongodb.net';

    /* Boopathy@Alpha */
    /* 03/06/2024 */
    const connectionUri = process.env.MONGODB_URL;
    const dbName = process.env.MONGODB_NAME;

    try {
      await mongoose.connect(`${connectionUri}/${dbName}`, options);
      console.log('Connected to MongoDB');
    } catch (e) {
      console.error('Error connecting to MongoDB:', e.message);
      console.error('Connection URI:', `${connectionUri}/${dbName}`);
      throw e;
    }
};

module.exports = InitiateMongoServer;
