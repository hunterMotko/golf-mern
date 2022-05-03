const mongoose = require('mongoose')

const connect = () => {
  return mongoose.connect(
    process.env.DBURL,
    { useNewUrlParser: true }
  )
}

module.exports = {
  connect
}