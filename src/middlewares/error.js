export const errorMiddleware = (error, req, res, next) => {
    console.log(error.cause);
    
    switch (error.code) {
        case ErrorEnum.ROUTING_ERROR:
            res.send({ status: "error", error: error.name, cause: error.cause });
            break;
        case ErrorEnum.INVALID_TYPES_ERROR:
            res.send({ status: "error", error: error.name, cause: error.cause });
            break;
        case ErrorEnum.DATABASE_ERROR:
            res.send({ status: "error", error: error.name, cause: error.cause });
            break;
        case ErrorEnum.PARAM_ERROR:
            res.send({ status: "error", error: error.name, cause: error.cause });
            break;
        case ErrorEnum.PRODUCT_ALREADY_EXISTS:
            res.send({ status: "error", error: error.name, cause: error.cause });
            break;
    
        default:
            res.send({ status: "error", message: "Unhandled Error" });
        }
    };