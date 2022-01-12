"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBodyParams = exports.RESPONSE_STATUS = void 0;
var RESPONSE_STATUS;
(function (RESPONSE_STATUS) {
    RESPONSE_STATUS[RESPONSE_STATUS["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    RESPONSE_STATUS[RESPONSE_STATUS["OK"] = 200] = "OK";
    RESPONSE_STATUS[RESPONSE_STATUS["CONFLICT"] = 409] = "CONFLICT";
    RESPONSE_STATUS[RESPONSE_STATUS["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    RESPONSE_STATUS[RESPONSE_STATUS["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    RESPONSE_STATUS[RESPONSE_STATUS["NOT_FOUND"] = 404] = "NOT_FOUND";
})(RESPONSE_STATUS = exports.RESPONSE_STATUS || (exports.RESPONSE_STATUS = {}));
const validateBodyParams = (validationSchema) => {
    return (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const value = yield validationSchema.validateAsync(request.body, { abortEarly: false });
        }
        catch (err) {
            const error = err;
            const customErrorMessage = error.details.map((detail) => detail.message).join("/n");
            return response.status(RESPONSE_STATUS.BAD_REQUEST).json({ status: RESPONSE_STATUS.BAD_REQUEST, result: customErrorMessage });
        }
        next();
    });
};
exports.validateBodyParams = validateBodyParams;
