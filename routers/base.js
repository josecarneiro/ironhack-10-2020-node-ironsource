'use strict';

const express = require('express');
const Resource = require('./../models/resource');
const User = require('./../models/user');
const createError = require('http-errors');

const router = new express.Router();

router.get('/', (req, res) => {
  // Sorting equation
  // P - Points
  // C - Creation date in milliseconds after epoch
  // N - Now, number of milliseconds after epoch
  // R - Rating
  // Equation
  // R = (P + 1) ** 2 / (N - C)

  const page = Number(req.query.page) || 1;

  const limit = 2;
  const skip = (page - 1) * limit;

  Resource.find()
    .skip(skip)
    .limit(limit)
    .populate('creator')
    .then((resources) => {
      res.render('home', {
        resources,
        previousPage: page - 1,
        nextPage: resources.length ? page + 1 : 0
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/profile/:id', (req, res, next) => {
  const id = req.params.id;
  let user;
  User.findById(id)
    .then((doc) => {
      user = doc;
      if (!user) {
        next(createError(404));
      } else {
        return Resource.find({ creator: id }).populate('creator');
      }
    })
    .then((resources) => {
      res.render('profile', { profile: user, resources });
    })
    .catch((error) => {
      if (error.kind === 'ObjectId') {
        next(createError(404));
      } else {
        next(error);
      }
    });
});

module.exports = router;
