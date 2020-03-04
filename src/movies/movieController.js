const movieService = require('./movieService')

const Movies = {
        /**
         * Release movie city wise
         * @param {movieName, cityID} request 
         * @param {*} response 
         */
        releaseMovieCityWise: async function(request, response) {
            const data = request.body
            if(data.movieName && data.cityID) {
                const message = await movieService.releaseMovieCityWise(data)
                response.status(200).send({succes: true, message})
            } else {
                response.status(500).send('Something went wrong!')
            }
        },
        /**
         * Get Movies list city wise
         * @param {cityID} request 
         * @param {*} response 
         */
        getAllPlayingMoviesListCityWise: async function(request, response) {
            const data = request.body
            console.log(request.query.cityID)
            if(request.query.cityID) {
                const data = await movieService.getAllPlayingMoviesListCityWise(request.query.cityID)
                response.status(200).send({succes: true, data})
            } else {
                response.status(500).send('Something went wrong!')
            }
        },
}
module.exports = Movies