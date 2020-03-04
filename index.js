/**
 * Register all model and bind with mongoDB connection
 */
require('./Connection/MongoConnection')
const express = require('express')
const fs = require('fs')
const port = 8001
const app = express()
const bodyParser = require('body-parser')

const authentication = require('./Middleware/Authentication')
const userController = require('./src/user/userController')
const cityController = require('./src/city/cityController')
const movieController = require('./src/movies/movieController')
const cinemaController = require('./src/cinema/cinemaController')
const ticketBookingController = require('./src/ticketBooking/ticketBookingController')

app.use(bodyParser.urlencoded({extended:true,}))
app.use(bodyParser.json({
    limit: '100mb'
}))

app.get('/', function(request, response){
    response.sendFile(__dirname+'/index.html')
})

app.post('/api/v1/user/create', userController.createUserAccount) // Register user
/**
 * Login user and return JWT token
 * Pass this JWT token into header to book your tickets (keyName: token)
 */
app.post('/api/v1/user/login', userController.login)
/**
 * Add new city. 
 * Note: Now i am just exposing it without any validation idealy it should be added by super user
 */
app.post('/api/v1/city/add', cityController.addCity)
app.get('/api/v1/city/list', cityController.getAllCityList) // Get all cities list
app.post('/api/v1/movie/release', movieController.releaseMovieCityWise)
app.get('/api/v1/movie/city/list', movieController.getAllPlayingMoviesListCityWise)
app.post('/api/v1/cinema/on-board', cinemaController.onBoardCinema)
app.post('/api/v1/cinema/release/movie', cinemaController.releaseMoviesInCineama)
app.post('/api/v1/ticket/book', authentication.isAutherised, ticketBookingController.bookTickets) // Only Login user can book tickets
app.get('/api/v1/cinema/movie', cinemaController.checkCinemaMoviesWise)
app.get('/api/v1/cinema/seat/availability', cinemaController.checkSeatAvailabilityOfShow)

app.listen(port, function(req, res){
    console.log('Server is running on port no.', port)
})