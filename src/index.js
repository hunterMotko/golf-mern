require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { auth, requiresAuth } = require('express-openid-connect');
const app = express();
const { connect } = require('./utils/db')

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_URL
};

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(auth(config));

app.get('/user', requiresAuth(), (req, res)=> {
  res.json(req.oidc.user);
})

const start = async()=> {
  try {
    await connect();
    app.listen(process.env.PORT, ()=>console.log(`Server on ${process.env.PORT}`));
  } catch (e) {
    console.error(e)
  }
}

start();