const mongoose = require('mongoose');
const mongo_uri = process.env.ENV === 'PROD' ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

mongoose.connect(mongo_uri);
