const mongoose = require('mongoose');
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
};

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, option).then(() => {
    console.log(`Connected to DB`)
}, (err) => {
    console.log(`Could not connect to DB`)
});
