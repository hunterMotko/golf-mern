const { Schema, model } = require('mongoose');

const Side = new Schema({
  name: {
    type: String,
    required: true,
  },
  par: {
    type: [Number],
    required: true
  },
  handicap: {
    type: [Number],
    required: true
  }
})

const ScoreCardSchema = new Schema({
  course: {
    type: String,
    required: true,
  },
  sides: [Side]
}, {timestamps: true})

const ScoreCard = model('scorecard', ScoreCardSchema);

module.exports = { ScoreCard }