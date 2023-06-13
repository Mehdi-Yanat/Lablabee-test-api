const { validationResult } = require("express-validator");

const handleValidationError = (res, errors, statusCode) => {
    return res.status(statusCode).json({
        success: false,
        message: errors,
    });
}

const expressResultValidation = (req, res) => {
    const error = validationResult(req)

    if (!error.isEmpty()) {
        return handleValidationError(res, error.array(), 400)
    }
}

module.exports = { handleValidationError, expressResultValidation }