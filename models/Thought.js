const mongoose = require('mongoose');
const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new mongoose.Schema({
  // reactionId: {
  //   type: Schema.Types.ObjectId,
  //   default: () => new Types.ObjectId
  // },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => {
      if (date) return date.format('MMM DD, YYYY')
    }
  }
})

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    require: true,
    minlength: 1,
    maxlength: 280 
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => {
      if (date) return dayjs(date).format('MMM DD, YYYY')
    }
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
},
{
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false,
});

thoughtSchema.virtual('reactionCount').get(function () {
  return `this thought has ${this.reactions.length} reactions`;
})

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;