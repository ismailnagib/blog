const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    words: {
        type: String,
        required: true
    },
    commenter: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
}, {
  timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment