const mongoose = require('mongoose')
const Schema = mongoose.Schema
const constants = require('../Utils/modelConstants')

const schema = new Schema({
 cinemaName: { type: String },
 cityID: { type: String },
},{collection: constants.CinemaModel, autoIndex: true, timestamps: true});

mongoose.model(constants.CinemaModel, schema);
