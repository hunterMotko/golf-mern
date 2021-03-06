const {ScoreCard} = require('../models/scorecard');

const getCards = async(req, res) => {
  try {
    const docs = await ScoreCard
      .find()
      .lean()
      .exec()

    res.json({ data: docs })
  } catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
}

const getOneCard = async(req, res) => {
  try {
    const doc = await ScoreCard
      .findOne({ _id: req.params.id })
      .lean()
      .exec()

    if (!doc) {
      return res.sendStatus(400)
    }

    res.json({ data: doc })
  } catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
}

const updateCard = async(req, res) => {
  const {id} = req.params;

  try {
    const updated = await ScoreCard.findOneAndUpdate({_id: id}, req.body, {new: true}).lean().exec();

    if (!updated) {
      return res.sendStatus(400)
    }

    res.status(200).json({ data: updated })
  } catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
}

const createCard = async(req,res) => {
  try {
    const doc = await ScoreCard.create({ ...req.body})
    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
}

module.exports = {
  getCards,
  createCard,
  getOneCard,
  updateCard
}