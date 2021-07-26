const mongoose = require("mongoose");

const mongooseConnect = (callback) => {
 mongoose 
    .connect(process.env.MongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology:true,
      useFindAndModify:false,
      useCreateIndex:true
    })
    .then((client) => {
      console.log(`Mongodb Connected: ${client.connection._connectionString}`);
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

module.exports = mongooseConnect;