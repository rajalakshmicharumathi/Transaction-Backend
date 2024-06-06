var _ = require('lodash');
var data = require("./data");

module.exports = {
    _errorResponse: function (err) {
        var json = {};
        json[data.responsekey.status_code] = data.statusCode.false;
        json[data.responsekey.statusKey] = data.statusKey.failure;
        json[data.responsekey.status_msg] = err;
        return json;
    },
    //success message
    _successResponse: function (err) {
        var json = {};
        json[data.responsekey.status_code] = data.statusCode.true;
        json[data.responsekey.statusKey] = data.statusKey.success;
        json[data.responsekey.status_msg] = err;
        return json;
    },
}