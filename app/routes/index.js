const userRouter = require('./users')
const sessionRouter = require('./session')
module.exports = (app) =>{

    app.use('/api/v1/users', userRouter)
    app.use('/api/v1/session', sessionRouter)

}