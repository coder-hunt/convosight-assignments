
const mongoose = require('mongoose')
const constants = require('../../Utils/modelConstants')
const UserModel = mongoose.model(constants.UserModel)

const userService = {
    /**
     * @param {*} userObject 
     */
    createUser: async function(data) {

        try {
            const userModel = new UserModel()
            
            userModel.author = data.author
            userModel.pseudonym = data.pseudonym
            userModel.username = data.username
            userModel.password = data.password
            await userModel.save()

          return 'Account created successfully.';
          
        } catch (error) {
            throw(error)
        }
    },
    isUserAavailable: async (username) => {
        try {
            const userDetails = await UserModel.findOne({username})
            return userDetails ? true : false
        } catch (error) {
            throw(error)
        }
    }
}
module.exports = userService;