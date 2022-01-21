const mongoos = require('mongoose')
const {MONGO_DBNAME, MONGO_HOST, MONGO_PORT} = process.env

mongoos.connection.on('error', error => {
    console.log('mongodb connection failed', error.message);
})

const startMongoDB = () => {
    mongoos.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = startMongoDB