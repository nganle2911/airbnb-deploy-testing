"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfoFromToken = void 0;
const getUserInfoFromToken = (jwtService, token) => {
    const decodedToken = jwtService.decode(token);
    const userId = decodedToken['user_id'];
    const userRole = decodedToken['user_role'];
    return { userId, userRole };
};
exports.getUserInfoFromToken = getUserInfoFromToken;
//# sourceMappingURL=decoded-token.js.map