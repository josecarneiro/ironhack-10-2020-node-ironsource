'use strict';

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true
    },
    creator: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    resource: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Resource'
    }
  },
  {
    timestamps: {
      createdAt: 'creationDate',
      updatedAt: 'updateDate'
    }
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
