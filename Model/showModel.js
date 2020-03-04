const mongoose = require('mongoose')
const Schema = mongoose.Schema
const constants = require('../Utils/modelConstants')

const schema = new Schema({
 movieID: { type: String },
 cinemaID: { type: String },
 showTime: { type: String },
 totalSeats: { type: Number }
},{collection: constants.ShowModel, autoIndex: true, timestamps: true});

mongoose.model(constants.ShowModel, schema);
