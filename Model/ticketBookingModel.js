const mongoose = require('mongoose')
const Schema = mongoose.Schema
const constants = require('../Utils/modelConstants')

const schema = new Schema({
   showID: { type: String },
   userID: { type: String },
   seats: { type: Number }
},{collection: constants.TicketBookingModel, autoIndex: true, timestamps: true});

mongoose.model(constants.TicketBookingModel, schema);