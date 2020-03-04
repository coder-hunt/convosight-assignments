const cinemaService = require('./cinemaService')

const Cinema = {
        /**
         * @param {cinemaName, cityID} request 
         * @param {*} response 
         */
        onBoardCinema: async function(request, response) {
           const data = request.body
           /**
            * Level 1 check cinemaName and cityID should not be blank
            */
           if(data.cinemaName && data.cityID) {
                const message = await cinemaService.onBoardCinema(request.body)
                response.status(200).send({succes: true, message})
           } else {
                response.status(500).send('Something went wrong!')
           }
        },
        /**
         * 
         * @param {cinemaID, movieID,showTime, totalSeats} request 
         * @param {*} response 
         */
        releaseMoviesInCineama: async function(request, response) {
          const data = request.body
          if(data.cinemaID && data.movieID && data.showTime && data.totalSeats){
               const message = await cinemaService.releaseMoviesInCineama(data)
               response.status(200).send({succes: true, message})
          } else {
               response.status(500).send('Something went wrong!')
          }
        },
                /**
         * check wheater a movie playing in your city or not
         * @param {movieID} request 
         * @param {*} response 
         */
        checkCinemaMoviesWise: async function(request, response) {
          const requestData = request.query
          if(requestData.movieID) {
            const data = await cinemaService.checkCinemaMoviesWise(requestData)
            response.status(200).send({succes: true, data})
          } else {
            response.status(500).send('Something went wrong!')
          }
      },
      /**
       * Check Seat availability of a show
       * @param {showID} request 
       * @param {*} response 
       */
      checkSeatAvailabilityOfShow: async function(request, response) {
         const data = request.query
         if(data.showID) {
           const message = await cinemaService.checkSeatAvailabilityOfShow(data)
           response.status(200).send({succes: true, message})
         } else {
           response.status(500).send('Something went wrong!')
         }
      }
}
module.exports = Cinema