const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// Get User list
router.get('/', async function(req, res, next) {
  try {
    res.json(await userService.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting employee `, err.message);
    next(err);
  }
});

module.exports = router;