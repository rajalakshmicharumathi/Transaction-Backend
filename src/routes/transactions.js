const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/Transaction');


// Get transactions with date filter and status filter
router.get('/', async (req, res) => {
    transactionController.transactionDetails(req.query,function(transactionDetails){
      res.send(transactionDetails);
    })
});
    

module.exports = router;
