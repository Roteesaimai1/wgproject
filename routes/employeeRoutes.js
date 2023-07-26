const express = require('express');
const router = express.Router();
const employeeS = require('../services/employeeService');
const foodstamp = require('../services/foodStampService')


// Get Employee list
router.get('/', async function(req, res, next) {
  try {
    res.json(await employeeS.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting employee `, err.message);
    next(err);
  }
});

// Get Food Stamp
router.get('/fs', async function(req, res, next) {
  try {
    res.json(await foodstamp.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting employee `, err.message);
    next(err);
  }
});

module.exports = router;