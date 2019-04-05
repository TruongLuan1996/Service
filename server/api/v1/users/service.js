const yields = require('express-yields');
const User = require('./model');

async function profile(id) {
  const user = await User.findById(id);
  return user;
}

module.exports = {
  profile,
};
