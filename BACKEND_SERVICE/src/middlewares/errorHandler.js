
function errorHandler(err, req, res, next) {
    console.log(err);
    if (err.statusCode == 400) {
        return res.BADREQUEST(err, 'OPERATION FAILED');
    }
    return res.APPERROR(err, 'OPERATION FAILED');

}

module.exports = errorHandler;