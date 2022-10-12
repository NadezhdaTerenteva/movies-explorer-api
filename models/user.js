const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Неверный формат email',
    },
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

userSchema.methods.toJSON = function toJSON() {
  const user = this.toObject();

  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
