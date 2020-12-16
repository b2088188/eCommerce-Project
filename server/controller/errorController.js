import AppError from '../utils/appError.js';

const globalErrorHandler = (err, req, res ,next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';
    if(process.env.NODE_ENV === 'development')    	
	  return sendErrorDev(err, res);
}

function sendErrorDev(err, res) {
	res.status(err.statusCode).json({
			status: err.status,
			error: err,
			message: err.message,
			stack: err.stack
		});
}

export default globalErrorHandler;