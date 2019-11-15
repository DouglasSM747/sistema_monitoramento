const jwt = require('jsonwebtoken');

module.exports.checkToken = function(application, request, response) {
    var token = request.body.token || request.query.token || request.headers['x-access-token'];

    if (token) {
        jwt.verify(token, S3CR37, function (err, decoded) {
            if (err) {
                response.send({success: true, response: false});
            } 
            else {
                response.send({success: true, response: true});
            }
        });
    } 
    else {
        response.send({success: true, response: false});
    }
}
