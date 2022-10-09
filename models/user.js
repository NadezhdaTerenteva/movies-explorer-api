const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
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
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.methods.toJSON = function toJSON() {
  const user = this.toObject();

  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
