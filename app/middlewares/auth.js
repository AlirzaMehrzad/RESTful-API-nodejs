const tokenService = require('../services/tokenService')

module.exports = (req, res, next) => {

    if(!('authorization' in req.headers)){
        return res.status(401).send({
            status: 'error',
            code: 401,
            message: 'شما صلاحیت استفاده از این api را ندارید'
        })
    }

    const token = tokenService.verify(req.headers.authorization)
    
    if(!token){
        return res.status(401).send({
            status: 'error',
            code: 401,
            message: 'your token is not valid'
        })
    }
    
    next()
}