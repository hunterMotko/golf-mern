const { User } = require('../models/user');

const createUser = async(req, res) => {
  const { username } = req.body;

  try {
    if (!username) {
      return res.status(401).json({msg: 'Username required'});
    }

    let found = await User.find({username});

    if (found.length>0) {
      return res.json(found);
    }

    let created = await User.create({username});
    res.json(created);
  } catch (e) {
    console.log(e)
  }
}

const getUsers = async(req, res) => {
  try {
    const docs = await User
      .find()
      .lean()
      .exec()

    res.json({ data: docs })
  } catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
}

const updateOne = async (req, res) => {
  try {
    let updated;
    if (req.body.round) {
      updated = await User.findOneAndUpdate(
        {_id: req.params.id}, {$push: {rounds: req.body.round}} ,{ new: true }
    ).lean().exec()
    } else {
      updated = await User.findOneAndUpdate(
          {_id: req.params.id}, req.body,{ new: true }
      ).lean().exec()
    }

    if (!updated) {
      return res.sendStatus(400)
    }

    res.json({ data: updated })
  } catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
}

module.exports = {
  getUsers,
  createUser,
  updateOne
}