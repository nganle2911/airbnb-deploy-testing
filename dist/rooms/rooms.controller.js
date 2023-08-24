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
exports.RoomsController = void 0;
const common_1 = require("@nestjs/common");
const rooms_service_1 = require("./rooms.service");
const swagger_1 = require("@nestjs/swagger");
const create_room_dto_1 = require("./dto/create-room.dto");
const fileUploadDto_dto_1 = require("../users/dto/fileUploadDto.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const update_room_dto_1 = require("./dto/update-room.dto");
let RoomsController = exports.RoomsController = class RoomsController {
    constructor(roomsService) {
        this.roomsService = roomsService;
    }
    getRooms() {
        return this.roomsService.getRooms();
    }
    createRoom(token, room) {
        return this.roomsService.createRoom(token, room);
    }
    getRoomsByPagination(pageIndex, pageSize, keyword) {
        return this.roomsService.getRoomsByPagination(pageIndex, pageSize, keyword);
    }
    getRoomById(roomId) {
        return this.roomsService.getRoomById(+roomId);
    }
    getRoomByLocationId(locationId) {
        return this.roomsService.getRoomByLocationId(Number(locationId));
    }
    updateRoomByRoomId(roomId, token, roomInfo) {
        return this.roomsService.updateRoomByRoomId(Number(roomId), token, roomInfo);
    }
    deleteRoomByRoomId(roomId, token) {
        return this.roomsService.deleteRoomByRoomId(Number(roomId), token);
    }
    uploadAvatar(roomId, file, token) {
        return this.roomsService.uploadRoomImg(+roomId, file, token);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "getRooms", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'token',
        description: 'Your authentication token',
        required: true,
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('token')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_room_dto_1.CreateRoomDto]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Get)('pagination'),
    __param(0, (0, common_1.Query)('pageIndex')),
    __param(1, (0, common_1.Query)('pageSize')),
    __param(2, (0, common_1.Query)('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "getRoomsByPagination", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "getRoomById", null);
__decorate([
    (0, common_1.Get)('rooms-by-location'),
    __param(0, (0, common_1.Query)('location_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "getRoomByLocationId", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'token',
        description: 'Your authentication token',
        required: true,
    }),
    (0, swagger_1.ApiParam)({
        name: 'id'
    }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('token')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, update_room_dto_1.UpdateRoomDto]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "updateRoomByRoomId", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true
    }),
    (0, swagger_1.ApiHeader)({
        name: 'token',
        description: 'Your authentication token',
        required: true,
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "deleteRoomByRoomId", null);
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
    (0, swagger_1.ApiQuery)({ name: 'room_id' }),
    (0, common_1.Post)('upload-room-image'),
    __param(0, (0, common_1.Query)('room_id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Headers)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "uploadAvatar", null);
exports.RoomsController = RoomsController = __decorate([
    (0, swagger_1.ApiTags)('Rooms'),
    (0, common_1.Controller)('api/rooms'),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService])
], RoomsController);
//# sourceMappingURL=rooms.controller.js.map