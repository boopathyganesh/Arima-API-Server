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
    const connectionUri = 'mongodb+srv://boopathydev:9VzLdqjrIjiVeQpi@clusteralpha.0alwstn.mongodb.net';
    const dbName = 'arima';

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
