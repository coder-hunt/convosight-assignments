const mongoose = require('mongoose')
const Schema = mongoose.Schema
const constants = require('../Utils/modelConstants')

const schema = new Schema({
 movieName: { type: String },
 cityID: { type: String },
},{collection: constants.MoviesModel, autoIndex: true, timestamps: true});

 mongoose.model(constants.MoviesModel, schema);
