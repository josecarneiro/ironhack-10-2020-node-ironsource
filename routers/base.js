const express = require('express');
const Resource = require('./../models/resource');

const router = new express.Router();

router.get('/', (req, res, next) => {
  // Inspired by https://jkchu.com/2016/02/17/designing-and-implementing-a-ranking-algorithm/
  // This algorythm takes into account
  // P - Points
  // D - Creation date in milliseconds after epoch
  // N - Now, number of milliseconds after epoch
  // H - Number of milliseconds in 1h, 1000 * 60 * 60
  // The final calculation is
  // Ranking = (P + 1) ** 2 / ((N - D) / H)
  Resource.aggregate([
    {
      $addFields: {
        item: '$_id',
        ranking: {
          $divide: [
            { $pow: [{ $sum: ['$points', 1] }, 2] },
            {
              $divide: [
                { $subtract: [new Date(), '$creationDate'] },
                1000 * 60 * 60
              ]
            }
          ]
        }
      }
    },
    { $sort: { ranking: -1 } }
  ])
    .then((resources) => {
      return Resource.populate(resources, 'creator');
    })
    .then((resources) => {
      res.render('home', { resources });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/profile', (req, res, next) => {
  if (req.user) {
    res.render('profile');
  } else {
    next(new Error('User is not authenticated.'));
  }
});

module.exports = router;
