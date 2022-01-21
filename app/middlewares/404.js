module.exports = (app) => {

    app.use((req, res, next) => {
        res.status(404).send({
            code: 'not found',
            status: 404,
            message: 'requested resource could not be found'
        })
    })
}