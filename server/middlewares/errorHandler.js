function errorHandler(error, req, res, next) {
    console.log(error);

    let statusCode = 500;
    let message = "Internal Server Error";

    switch (error.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            statusCode = 400
            message = error.errors[0].message
            break;
    }

    res.status(statusCode).json({ message })

}

module.exports = errorHandler;