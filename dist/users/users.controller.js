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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const users_service_1 = require("./users.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const fileUploadDto_dto_1 = require("./dto/fileUploadDto.dto");
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
let UsersController = exports.UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getUsers() {
        return this.usersService.getUsers();
    }
    createUser(user, token) {
        return this.usersService.createUser(user, token);
    }
    deleteUserById(deleteId, token) {
        return this.usersService.deleteUserById(+deleteId, token);
    }
    getUsersByPagination(pageIndex, pageSize, keyword) {
        return this.usersService.getUsersByPagination(pageIndex, pageSize, keyword);
    }
    getUserById(userId) {
        return this.usersService.getUserById(+userId);
    }
    getUserByName(userName) {
        return this.usersService.getUserByName(userName);
    }
    updateUser(token, userUpdate) {
        return this.usersService.updateUser(token, userUpdate);
    }
    uploadAvatar(file, token) {
        return this.usersService.uploadAvatar(token, file);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'token',
        description: 'Your authentication token',
        required: true,
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'token',
        description: 'Your authentication token',
        required: true,
    }),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Headers)("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUserById", null);
__decorate([
    (0, common_1.Get)('pagination'),
    __param(0, (0, common_1.Query)('pageIndex')),
    __param(1, (0, common_1.Query)('pageSize')),
    __param(2, (0, common_1.Query)('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUsersByPagination", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Get)('search/:full_name'),
    __param(0, (0, common_1.Param)('full_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserByName", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'token',
        description: 'Your authentication token',
        required: true,
    }),
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Headers)('token')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: fileUploadDto_dto_1.FileUploadDto }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: process.cwd() + '/public/img',
            filename: (req, file, callback) => {
                callback(null, new Date().getTime() + file.originalname);
            },
        }),
    })),
    (0, swagger_1.ApiHeader)({
        name: 'token',
        description: 'Your authentication token',
        required: true,
    }),
    (0, common_1.Post)('upload-avatar'),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Headers)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "uploadAvatar", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('api/users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map