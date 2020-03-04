const ticketBookingService = require('./ticketBookingService')


const TicketBooking = {
        /**
         * @param {showID, userID, seats} request 
         * @param {*} response 
         */
        bookTickets: async function(request, response) {
           const data = request.body
           /**
            * Level 1 check showID, userID, seats should not be blank
            */
           if(data.showID && data.userID && data.seats) {
                const message = await ticketBookingService.bookTickets(request.body)
                response.status(200).send({succes: true, message})
           } else {
                response.status(500).send('Something went wrong!')
           }
        },
}
module.exports = TicketBooking