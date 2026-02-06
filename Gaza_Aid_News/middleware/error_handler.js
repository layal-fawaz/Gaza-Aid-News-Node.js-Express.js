const logger=require('./logger')
module.exports=(err,req,res,next)=>{
    logger.error('Unhandled Error: %o', err);
    const statusCode=err.status||500
    res.status(statusCode).json({
      message: statusCode === 500 ? 'حدث خطأ في الخادم، حاول لاحقا' : err.message
    })
}