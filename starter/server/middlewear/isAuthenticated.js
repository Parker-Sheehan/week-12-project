// searches down .env and adds it to the file
require('dotenv').config()
// requiring the jwt package
const jwt = require('jsonwebtoken')
// desructuring the secret code from my .env
const {SECRET} = process.env

module.exports = {
    // function to check authentication
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')

        // check if token exists
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        // verify the token is real secret encription changes based on payload and header and secret
        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}