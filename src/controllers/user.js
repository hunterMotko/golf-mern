const { User } = require('../models/user');

const checkUser = (req, res) => {

}

const updateUser = async (req, res) => {
  try {

  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

module.exports = {
  checkUser,
  updateUser
}