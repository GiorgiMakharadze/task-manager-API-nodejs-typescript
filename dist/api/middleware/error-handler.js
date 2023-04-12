"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const errorHandlerMiddleware = (err, req, res, next) => {
    return res.status(500).json({ message: err });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
