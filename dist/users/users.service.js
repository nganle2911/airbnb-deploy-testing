"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const response_template_1 = require("./../util/response-template");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const roles_enum_1 = require("../enum/roles.enum");
const decoded_token_1 = require("../util/decoded-token");
let UsersService = exports.UsersService = class UsersService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.prisma = new client_1.PrismaClient();
    }
    async getUsers() {
        try {
            let getUsers = await this.prisma.users.findMany();
            let data = getUsers.map((user) => ({
                ...user,
                pass_word: '',
                phone: '',
            }));
            return (0, response_template_1.responseArray)(200, 'Get users successfully!', data.length, data);
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async createUser(user, token) {
        try {
            let { email, pass_word, full_name, birth_day, gender, phone, user_role } = user;
            const { userId, userRole } = await (0, decoded_token_1.getUserInfoFromToken)(this.jwtService, token);
            if (userRole === roles_enum_1.Roles.ADMIN) {
                let checkEmail = await this.prisma.users.findFirst({
                    where: {
                        email,
                    },
                });
                if (checkEmail) {
                    throw new common_1.BadRequestException((0, response_template_1.responseObject)(400, 'Request is invalid', 'Email already existed!'));
                }
                else {
                    let newUser = {
                        email,
                        pass_word: bcrypt.hashSync(pass_word, 10),
                        full_name,
                        birth_day,
                        gender,
                        user_role,
                        phone,
                    };
                    await this.prisma.users.create({
                        data: newUser,
                    });
                    return (0, response_template_1.responseObject)(200, 'Create user successfully!', newUser);
                }
            }
            else {
                throw new common_1.ForbiddenException((0, response_template_1.responseObject)(403, 'Request is invalid', "You don't have permission to access!"));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async deleteUserById(deleteId, token) {
        try {
            const { userId, userRole } = await (0, decoded_token_1.getUserInfoFromToken)(this.jwtService, token);
            let checkUser = await this.prisma.users.findUnique({
                where: {
                    user_id: deleteId,
                },
            });
            if (checkUser) {
                if (userId === deleteId || userRole === roles_enum_1.Roles.ADMIN) {
                    await this.prisma.reservations.deleteMany({
                        where: {
                            user_id: deleteId,
                        },
                    });
                    await this.prisma.reviews.deleteMany({
                        where: {
                            user_id: deleteId,
                        },
                    });
                    await this.prisma.users.delete({
                        where: {
                            user_id: deleteId,
                        },
                    });
                    return (0, response_template_1.responseObject)(200, 'Delete user successfully!', null);
                }
                else {
                    throw new common_1.ForbiddenException((0, response_template_1.responseObject)(403, 'Request is invalid', "You don't have permission to access!"));
                }
            }
            else {
                throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, 'Request is invalid', 'User not found!'));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async getUsersByPagination(pageIndex, pageSize, keyword) {
        try {
            let startIndex = (pageIndex - 1) * pageSize;
            let endIndex = startIndex + pageSize;
            let filteredItems = await this.prisma.users.findMany({
                where: {
                    full_name: {
                        contains: keyword,
                    },
                },
            });
            if (keyword) {
                filteredItems = filteredItems.filter((item) => item.full_name.toLowerCase().includes(keyword.toLowerCase()));
            }
            let itemSlice = filteredItems.slice(startIndex, endIndex);
            if (filteredItems.length > 0) {
                return (0, response_template_1.responseObject)(200, 'Get users successfully!', {
                    pageIndex,
                    pageSize,
                    totalRow: filteredItems.length,
                    keyword: `Name LIKE %${keyword}%`,
                    data: itemSlice,
                });
            }
            else {
                return (0, response_template_1.responseObject)(200, 'No matching results found!', {
                    pageIndex,
                    pageSize,
                    totalRow: filteredItems.length,
                    keyword: `Name LIKE %${keyword}%`,
                    data: itemSlice,
                });
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async getUserById(userId) {
        try {
            let checkUser = await this.prisma.users.findUnique({
                where: {
                    user_id: userId,
                },
            });
            let data = { ...checkUser, pass_word: '' };
            if (checkUser) {
                return (0, response_template_1.responseObject)(200, 'Get user successfully!', data);
            }
            else {
                throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, 'Request is invalid', 'User not found!'));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async getUserByName(userName) {
        try {
            let checkName = await this.prisma.users.findMany({
                where: {
                    full_name: {
                        contains: userName,
                    },
                },
            });
            if (checkName.length > 0) {
                return (0, response_template_1.responseArray)(200, 'Get users successfully!', checkName.length, checkName);
            }
            else {
                return (0, response_template_1.responseObject)(200, 'No matching results found!', checkName);
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async updateUser(token, userUpdate) {
        try {
            const { userId, userRole } = await (0, decoded_token_1.getUserInfoFromToken)(this.jwtService, token);
            const { full_name, email, birth_day, gender, phone } = userUpdate;
            let newData = {
                full_name,
                email,
                birth_day,
                gender,
                user_role: userRole,
                phone,
            };
            let checkUser = await this.prisma.users.findUnique({
                where: {
                    user_id: userId,
                },
            });
            if (checkUser) {
                const update = await this.prisma.users.update({
                    where: {
                        user_id: userId,
                    },
                    data: newData,
                });
                return (0, response_template_1.responseObject)(200, 'Update user successfully!', update);
            }
            else {
                throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, 'Request is invalid', "User doesn't exist!"));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async uploadAvatar(token, file) {
        try {
            const { userId } = await (0, decoded_token_1.getUserInfoFromToken)(this.jwtService, token);
            let checkUser = await this.prisma.users.findUnique({
                where: {
                    user_id: userId,
                },
            });
            if (checkUser) {
                let userInfo = await this.prisma.users.update({
                    where: {
                        user_id: userId,
                    },
                    data: {
                        avatar: file.filename,
                    },
                });
                return (0, response_template_1.responseObject)(200, 'Upload avatar successfully!', userInfo);
            }
            else {
                throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, 'Request is invalid', "User doesn't exist!"));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map