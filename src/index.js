require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const { connect } = require('./utils/db')
const { router } = require('./routes/routes')

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', router);

const start = async()=> {
  try {
    await connect();
    app.listen(process.env.PORT, ()=>console.log(`Server on ${process.env.PORT}`));
  } catch (e) {
    console.error(e)
  }
}

start();