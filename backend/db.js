const mongoose = require('mongoose');
const mongo_uri = process.env.ENV === 'PROD' ? MONGO_URI_PROD : MONGO_URI_DEV;

mongoose.connect(mongo_uri);
