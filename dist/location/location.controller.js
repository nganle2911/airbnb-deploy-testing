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
exports.LocationController = void 0;
const common_1 = require("@nestjs/common");
const location_service_1 = require("./location.service");
const swagger_1 = require("@nestjs/swagger");
const update_location_dto_1 = require("./dto/update-location.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const file_upload_dto_1 = require("./dto/file-upload.dto");
const create_location_dto_1 = require("./dto/create-location.dto");
let LocationController = exports.LocationController = class LocationController {
    constructor(locationService) {
        this.locationService = locationService;
    }
    getLocations() {
        return this.locationService.getLocations();
    }
    createLocation(token, location) {
        return this.locationService.createLocation(token, location);
    }
    getLocationByLocationId(locationId) {
        return this.locationService.getLocationByLocationId(Number(locationId));
    }
    updateLocation(token, locationId, updateLocation) {
        return this.locationService.updateLocation(token, +locationId, updateLocation);
    }
    getLocationPagination(pageIndex, pageSize, keyWord) {
        return this.locationService.getLocationPagination(pageIndex, pageSize, keyWord);
    }
    uploadImage(token, locationId, file) {
        return this.locationService.uploadImage(token, +locationId, file);
    }
    deleteLocation(token, locationId) {
        return this.locationService.deleteLocation(token, +locationId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "getLocations", null);
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
    __metadata("design:paramtypes", [Object, create_location_dto_1.CreateLocationDto]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "createLocation", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "getLocationByLocationId", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: "token",
        description: "Your authentication token",
        required: true
    }),
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_location_dto_1.UpdateLocationDto]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "updateLocation", null);
__decorate([
    (0, common_1.Get)('pagination'),
    __param(0, (0, common_1.Query)('pageIndex')),
    __param(1, (0, common_1.Query)('pageSize')),
    __param(2, (0, common_1.Query)('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "getLocationPagination", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: "token",
        description: "Your authentication token",
        required: true
    }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({ type: file_upload_dto_1.FileUploadLocationDto }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        storage: (0, multer_1.diskStorage)({
            destination: process.cwd() + "/public/img",
            filename: (req, file, callback) => callback(null, new Date().getTime() + file.originalname)
        })
    })),
    (0, common_1.Post)("upload-location-image"),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Query)("id")),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "uploadImage", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: "token",
        description: "Your authentication token",
        required: true
    }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "deleteLocation", null);
exports.LocationController = LocationController = __decorate([
    (0, swagger_1.ApiTags)('Location'),
    (0, common_1.Controller)('api/location'),
    __metadata("design:paramtypes", [location_service_1.LocationService])
], LocationController);
//# sourceMappingURL=location.controller.js.map