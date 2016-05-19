var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
  user: {
    username: String,
    email: String,
    password: String
  },
  infos: {
    hexa_size: Number,
    hexa_margin: Number,
    hexagons: String,
    gradient_size: Number,
    bg_color: String,
    bg_color2: String,
    lang: String,
    show_searchbar: Boolean,
    search_pos: Number,
    center_bg: Boolean,
    repeat_bg: Boolean,
    ajust_bg: Boolean,
    back_img: String
  }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.user.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
