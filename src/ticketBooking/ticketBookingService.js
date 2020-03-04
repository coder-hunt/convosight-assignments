
const mongoose = require('mongoose')
const constants = require('../../Utils/modelConstants')
const CityModel = mongoose.model(constants.CityModel)
const CinemaModel = mongoose.model(constants.CinemaModel)
const ShowModel = mongoose.model(constants.ShowModel)
const MoviesModel = mongoose.model(constants.MoviesModel)
const TicketBookingModel = mongoose.model(constants.TicketBookingModel)


const ticketBookingService = {
    /**
     * Book tickets
     * @param {showID, userID, seats} request 
     */
    bookTickets: async function(data){
      try {
        const showDetails = await ShowModel.findById(data.showID)
        if(showDetails.totalSeats>=data.seats) {
            const ticketBookingModel = new TicketBookingModel()
            ticketBookingModel.showID = data.showID
            ticketBookingModel.userID = data.userID
            ticketBookingModel.seats = data.seats
            await ticketBookingModel.save()
            await ShowModel.update({_id: data.showID}, { $set: {totalSeats: showDetails.totalSeats - data.seats } })
            return `Your ticket has been booked successfully`
        } else {
            if((data.seats - showDetails.totalSeats) == 0) {
                return `Sorry show already full!`
            } else {
                return `You can not book more then available ticket.Available tickets are ${showDetails.totalSeats}`
            }
        }
      } catch (error) {
        throw(error)
      }
    },
}
module.exports = ticketBookingService;