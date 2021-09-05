import mongoose from 'mongoose';

mongoose.Promise = Promise;


mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://WepJIoK:6jLxDb1C1O1kvknk@anime-site.a9znp.mongodb.net/anime-site?retryWrites=true&w=majority", {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'))

export {db, mongoose}

