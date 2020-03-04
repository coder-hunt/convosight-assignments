const cityService = require('./cityService')

const City = {
        /**
         * @param {cityName} request 
         * @param {*} response 
         */
        addCity: async function(request, response) {
           const data = request.body
           /**
            * Level 1 check cityName should not blank
            */
           if(data.cityName) {
                if(! await cityService.isCityAlreadyAdded(data)) {
                    const message = await cityService.addCity(request.body)
                    response.status(200).send({succes: true, message})
                } else {
                    response.status(403).send('City Already added!')                
                }
           } else {
                response.status(500).send('Something went wrong!')
           }
        },
        /**
         * Get All city list
         */
        getAllCityList: async function(request, response) {
            const data = await cityService.getCitiesList()
            response.status(200).send({succes: true, data })
        },
}
module.exports = City