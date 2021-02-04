'use strict';

const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['book', 'video', 'article', 'blog', 'tweet', 'podcast', 'course'],
      required: true
    },
    topics: [
      {
        type: String,
        enum: ['javascript', 'css', 'html', 'mongodb', 'canvas', 'react', 'vue']
      }
    ],
    difficulty: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
      default: 3
    },
    image: {
      type: String
    },
    points: {
      type: Number,
      required: true,
      default: 0
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    comments: [
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
      }
    ]
  },
  {
    timestamps: {
      createdAt: 'creationDate',
      updatedAt: 'updateDate'
    }
  }
);

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
