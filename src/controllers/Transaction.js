var _ = require('lodash');
var async = require('async');
const crypto = require('crypto');
const Transaction = require('../models/Transaction');
var helper = require('../helper');
var data = require('../data');
var config = require('../config');

var transaction = {
    _processTransaction: function (req, callback) {     
        const { startDate, endDate } = req;
        async.waterfall([
            function (callback) {
                transaction._getTransactionDetails(startDate,endDate,function(err,transacRep){
                    callback(err,transacRep);
                })
            },
            function(transResp,callback){
                transaction._formatTransactionData(transResp,function(err,formatResp){
                    callback(err,formatResp);
                })
            }
        ], function (err, result) {
            if (err) {
                callback(helper._errorResponse(err.toString()));
            }
            else {
                callback(helper._successResponse(result));
            }
        });
    },

    /* Function get transaction details from transaction table.
       startDate - Starting Date
       endDate   - end Date
    */
    _getTransactionDetails:async function (startDate,endDate,callback){
        let query = {
            status: { $in: ['COMPLETED', 'IN PROGRESS', 'REJECTED'] }
        };

        // Add date filter if startDate and endDate are provided
        if (startDate && endDate) {
            const start = Date.parse(startDate);
            const end = Date.parse(endDate);
        
            if (isNaN(start) || isNaN(end)) {
              callback(data.errorMsg.invalid_date_time,null);
            }
        
            query.date = {
              $gte: start,
              $lte: end
            };
        }
        try {
            const transactions = await Transaction.find(query)
            .select('id date Comments')
            .sort({ date: 1 });
            callback(null,transactions);
        } catch (err) {
            callback(err.message,null);
        }
    },

    /*encrypting the data*/
    _hashId:function(id){
            const secret = config.hash_key;
            return crypto.createHmac('sha256', secret).update(id).digest('hex');
    },

    /* Encrypting the id for security purpose using sha256 */ 
    _formatTransactionData:async function(transactionData,callback){
        try{
            const hashedTransactions = await transactionData.map(transactionDet => ({
                id:transaction._hashId(transactionDet.id),
                date: transactionDet.date,
                Comments: transactionDet.Comments
              }));
            callback(null,hashedTransactions);
        }catch(err){
            callback(err,null)
        }
        
    }

}
exports.transactionDetails = function (req, callback) {
    transaction._processTransaction(req, function (response) {
        callback(response);
    });
}