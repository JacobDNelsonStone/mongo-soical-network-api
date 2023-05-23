const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group"
  }, 
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

userSchema.virtual('fullname').get( function() {
  return `${this.fname} ${this.lname}`;
})

userSchema.virtual('firstNameAndEmail').get( function() {
  return `${this.fname.toLowerCase()} ${this.email}`;
})

const User = mongoose.model('User', userSchema);

module.exports = User;