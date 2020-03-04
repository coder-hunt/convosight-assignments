const mongoose = require('mongoose')
const Schema = mongoose.Schema
const constants = require('../Utils/modelConstants')

const schema = new Schema({
 cityName: { type: String },
},{collection: constants.CityModel, autoIndex: true, timestamps: true});

mongoose.model(constants.CityModel, schema);
