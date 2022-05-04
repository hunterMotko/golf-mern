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

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

module.exports = {
  getUsers,
  createUser
}