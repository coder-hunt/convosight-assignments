
const mongoose = require('mongoose')
const constants = require('../../Utils/modelConstants')
const CityModel = mongoose.model(constants.CityModel)

const cityService = {
    /**
     * Add new City
     * @param {cityName} data 
     */
    addCity: async function(data){
      try {
        const isCityAlreadyAdded = await CityModel.find({cityName: data.cityName})
        const cityModel = new CityModel()
        cityModel.cityName = data.cityName
        await cityModel.save()
        return "City successfully added"
      } catch (error) {
        throw(error)
      }
    },
    /**
     * Get City List
     */
    getCitiesList: async function() {
        try {
          return await CityModel.find({}, {__v:0});
        } catch (error) {
            throw(error)
        }
    },
    /**
     * Check wheter the city allready exist or not
     * @param {cityName} data 
     */
    isCityAlreadyAdded: async function(data) {
      try {
        const isCityAlreadyAdded = await CityModel.find({cityName: data.cityName})
        return isCityAlreadyAdded.length !== 0 ? true : false
      } catch (error) {
        throw(error)
      }
    }
}
module.exports = cityService;