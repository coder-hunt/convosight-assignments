const mongoose = require('mongoose')
const constants = require('../Utils/modelConstants')
const UserModel = mongoose.model(constants.UserModel)
const redisClient = require('../Redis/redisConnection')
const JWT = require('jsonwebtoken')
const secretKey = 'convosight'

const AuthenticateMiddleware= {
  isAutherised: async function (request, response, next) {
    const token = request.headers.token
    try {
        if(token && token !== '') {
           redisClient.exists(token, function(err, isExist){
              if(isExist) {
                const userDetails = JWT.verify(token, secretKey)
                next()
              } else {
                response.status(401).send({success: false, message: "Unauthorised access"})
              }
           })
        } else {
            response.status(401).send({success: false, message: "Unauthorised access"})
        }
    } catch (error) {
      response.status(500).send({success: false, message: "Something went wrong."})
    }
  }
}

module.exports = AuthenticateMiddleware
