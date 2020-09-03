const mongoose = require('mongoose');
const keys = require('../config/keys');
const connectionURL = keys.mongoURI;
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
