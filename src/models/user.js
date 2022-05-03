const { Schema, model } = require('mongoose');
const bcrypt = reqire('bcrypt');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {timestamps: true})

export const User = model('user', UserSchema)