const userService = require('./userService')
const JWT = require('jsonwebtoken')
const secretKey = 'convosight'
const redisClient = require('../../Redis/redisConnection')

const User = {
        /**
         * @param {username, password, phoneNumber} request 
         * @param {*} response 
         */
        createUserAccount: async function(request, response) {
            const data = request.body
            /**
             * Level one check username, password should not be blanks
             */
            if(data.username && data.password) {
                const message = await userService.createUser(request.body)
                response.status(200).send({succes: true, message})
            } else {
                response.status(500).send(j)
            }
        },
        /**
         * @param {username, password} request
         * @param {JWT} response
         */
        login: async function(request, response, next) {
            const username = request.body.username
            const password = request.body.password
            /**
             * For login username, password should not be blanks
             */
            if(username && password) {
                const isAutherAvailable = await userService.isUserAavailable(username)
                if(isAutherAvailable) {
                    const token = JWT.sign({username: username, password: password}, secretKey)
                    // Store token into redis for authentication
                    redisClient.set(token, username)
                    response.status(200).send({succes: true, data: {token}})
                } else {
                    response.status(401).send({succes: false, message: 'User not available' })
                }
            } else {
                response.status(500).send({succes: false, message: "Somthing went wrong"})
            }
        }
}
module.exports = User