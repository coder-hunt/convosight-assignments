
const mongoose = require('mongoose')
const constants = require('../../Utils/modelConstants')
const MoviesModel = mongoose.model(constants.MoviesModel)
const CityModel = mongoose.model(constants.CityModel)

const movieService = {
    /**
     * Release Movie city wise
     * @param {movieName, cityID} data 
     */
    releaseMovieCityWise: async  function(data) {
        try {
            const city = await CityModel.findById(data.cityID)
            if(city !== undefined && city._id !== undefined) {
                const moviesModel = new MoviesModel()
                moviesModel.movieName = data.movieName
                moviesModel.cityID = data.cityID
                await moviesModel.save()
                return `${data.movieName} has been release in ${city.cityName}`
            }
            return cityID
        } catch (error) {

        }
    },
    /**
     * @param {cityID} cityID
     */
    getAllPlayingMoviesListCityWise: async function(cityID) {
        try {
          const moviesList = await MoviesModel.find({cityID}, {__v:0})
          return moviesList;
        } catch (error) {
            throw(error)
        }
    },
}
module.exports = movieService;