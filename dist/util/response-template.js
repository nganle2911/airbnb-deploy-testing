"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseObject = exports.responseArray = void 0;
const responseArray = (statusCode, message, total, content) => {
    return {
        statusCode,
        message,
        total,
        content,
        dateTime: new Date().toISOString()
    };
};
exports.responseArray = responseArray;
const responseObject = (statusCode, message, content) => {
    return {
        statusCode,
        message,
        content,
        dateTime: new Date().toISOString()
    };
};
exports.responseObject = responseObject;
//# sourceMappingURL=response-template.js.map