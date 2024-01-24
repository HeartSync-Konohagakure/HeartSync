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
        case 'Password is required':
            statusCode = 400
            message = 'Password is required'
            break;
        case 'Email is required':
            statusCode = 400
            message = 'Email is required'
            break;
        case 'Invalid email/password':
            statusCode = 401
            message = 'Invalid email/password'
            break;
        case 'User Not Found':
            statusCode = 404
            message = 'User does not exist'
            break;
        case 'invalidToken':
            statusCode = 401
            message = 'Invalid token'
            break;
        case 'NotFound':
            statusCode = 404
            message = 'Data Not Found'
            break;
        case 'Forbidden':
            statusCode = 403
            message = 'Forbidden Access'
            break;
    }

    res.status(statusCode).json({ message })

}

module.exports = errorHandler;