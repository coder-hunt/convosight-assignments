
const mongoose = require('mongoose')
const constants = require('../../Utils/modelConstants')
const CityModel = mongoose.model(constants.CityModel)
const CinemaModel = mongoose.model(constants.CinemaModel)
const ShowModel = mongoose.model(constants.ShowModel)
const MoviesModel = mongoose.model(constants.MoviesModel)

const cinemaService = {
    /**
     * onBoard Cinema
     * @param {cinemaName, cityID} data 
     */
    onBoardCinema: async function(data){
      try {
        const city = await CityModel.findById(data.cityID)
        const cinemaModel = new CinemaModel()
        cinemaModel.cinemaName = data.cinemaName
        cinemaModel.cityID = data.cityID
        await cinemaModel.save()
        return `${data.cinemaName} cinema has been onBoard successfully in ${city.cityName}`
      } catch (error) {
        throw(error)
      }
    },
    /**
     * Release movie in purticular cinema of a city
     * @param {*} data 
     */
    releaseMoviesInCineama: async function(data) {
      try {
        const movie = await MoviesModel.find({_id:data.movieID})
        const cinema = await CinemaModel.find({_id: data.cinemaID})
        if(movie.length && cinema.length) {
          const showModel = new ShowModel()
          showModel.cinemaID = data.cinemaID
          showModel.totalSeats = data.totalSeats
          showModel.movieID = data.movieID
          showModel.showTime = data.showTime
          await showModel.save()
          return "Movie has been release in cinema"
        }
      } catch (error) {
        throw(error)
      }
    },
    /**
     * List all cinema where a movie is playing
     * @param {movieID} data 
     */
    checkCinemaMoviesWise: async function(data) {
      const movie = await MoviesModel.find({ _id:data.movieID })
      if(movie.length>0) {
        const showDetails = await ShowModel.find({ movieID:data.movieID }, {cinemaID:1, showTime:1})
        const cinemaIDs = showDetails.map((showItems) => {
          return showItems.cinemaID
        })
        const cinemaDetailsObj = await CinemaModel.find({_id: {$in:cinemaIDs}})
        const cinemaDetails = cinemaDetailsObj.map((cinema) => {
          const showTimes = showDetails.map((show) => {
            return show.cinemaID == cinema._id && show.showTime
          })
          const cinemaDetail = {}
          cinemaDetail.cinemaName = cinema.cinemaName
          cinemaDetail.showTimes = showTimes
          return cinemaDetail
        })
        return cinemaDetails
      } else {
        return "Invalid movies request"
      }
      return movie
    },
    /**
     * Check seat availability of showTime
     *  @param {showID} data 
     */
    checkSeatAvailabilityOfShow: async function(data){
      const showDetails = await ShowModel.findById(data.showID)
      return show.totalSeats !== 0 ? "Available" : "Not availale"
    }
}
module.exports = cinemaService;