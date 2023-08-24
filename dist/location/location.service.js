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
exports.LocationService = void 0;
const response_template_1 = require("./../util/response-template");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const jwt_1 = require("@nestjs/jwt");
const roles_enum_1 = require("../enum/roles.enum");
const response_template_2 = require("../util/response-template");
const decoded_token_1 = require("../util/decoded-token");
let LocationService = exports.LocationService = class LocationService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.prisma = new client_1.PrismaClient();
    }
    async getLocations() {
        try {
            const locations = await this.prisma.location.findMany();
            return (0, response_template_1.responseArray)(200, 'Get locations successfully!', locations.length, locations);
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async createLocation(token, location) {
        try {
            const { userId, userRole } = await (0, decoded_token_1.getUserInfoFromToken)(this.jwtService, token);
            let checkUser = await this.prisma.users.findUnique({
                where: {
                    user_id: userId
                }
            });
            if (checkUser) {
                if (userRole === roles_enum_1.Roles.ADMIN) {
                    const { location_name, province, nation, location_image } = location;
                    let newLocation = {
                        location_name,
                        province,
                        nation,
                        location_image,
                    };
                    const create = await this.prisma.location.create({
                        data: newLocation,
                    });
                    return (0, response_template_2.responseObject)(201, "Create location successfully!", create);
                }
                else {
                    throw new common_1.ForbiddenException((0, response_template_2.responseObject)(403, "Request is invalid", "You don't have permission to access!"));
                }
            }
            else {
                throw new common_1.NotFoundException((0, response_template_2.responseObject)(404, "Request is invalid", "User doesn't exist!"));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async getLocationByLocationId(locationId) {
        try {
            let checkLocation = await this.prisma.location.findUnique({
                where: {
                    location_id: locationId
                }
            });
            if (checkLocation) {
                return (0, response_template_2.responseObject)(200, 'Get location successfully!', checkLocation);
            }
            else {
                throw new common_1.NotFoundException((0, response_template_2.responseObject)(404, "Request is invalid", "Location not found!"));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async updateLocation(token, locationId, updateLocation) {
        try {
            const { userId, userRole } = await (0, decoded_token_1.getUserInfoFromToken)(this.jwtService, token);
            let { location_name, province, nation, location_image } = updateLocation;
            let newLocation = {
                location_name,
                province,
                nation,
                location_image
            };
            let checkLocation = await this.prisma.location.findUnique({
                where: {
                    location_id: locationId
                }
            });
            if (checkLocation) {
                let checkUser = await this.prisma.users.findUnique({
                    where: {
                        user_id: userId
                    }
                });
                if (checkUser) {
                    if (userRole === roles_enum_1.Roles.ADMIN) {
                        const newUpdate = await this.prisma.location.update({
                            where: {
                                location_id: locationId
                            },
                            data: newLocation
                        });
                        return (0, response_template_2.responseObject)(200, "Update location successfully!", newUpdate);
                    }
                    else {
                        throw new common_1.ForbiddenException((0, response_template_2.responseObject)(403, "Request is invalid", "You don't have permission to access!"));
                    }
                }
                else {
                    throw new common_1.NotFoundException((0, response_template_2.responseObject)(404, "Request is invalid", "User doesn't exist!"));
                }
            }
            else {
                throw new common_1.NotFoundException((0, response_template_2.responseObject)(404, "Request is invalid", "Location not found!"));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async getLocationPagination(pageIndex, pageSize, keyword) {
        try {
            const startIndex = (pageIndex - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            let filteredItems = await this.prisma.location.findMany({
                where: {
                    location_name: {
                        contains: keyword,
                    },
                },
            });
            if (filteredItems.length > 0) {
                if (keyword) {
                    filteredItems = filteredItems.filter((item) => item.location_name.toLowerCase().includes(keyword.toLowerCase()));
                }
                const itemSlice = filteredItems.slice(startIndex, endIndex);
                return (0, response_template_2.responseObject)(200, "Get locations successfully!", {
                    pageIndex,
                    pageSize,
                    totalRow: filteredItems.length,
                    keyword: `Location name LIKE $%{keyword}%`,
                    data: itemSlice
                });
            }
            else {
                return (0, response_template_2.responseObject)(200, "No matching results found!", filteredItems);
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async uploadImage(token, locationId, file) {
        try {
            const { userId, userRole } = await (0, decoded_token_1.getUserInfoFromToken)(this.jwtService, token);
            let checkLocation = await this.prisma.location.findUnique({
                where: {
                    location_id: locationId
                }
            });
            if (checkLocation) {
                let checkUser = await this.prisma.users.findUnique({
                    where: {
                        user_id: userId
                    }
                });
                if (checkUser) {
                    if (userRole === roles_enum_1.Roles.ADMIN) {
                        let uploadImg = await this.prisma.location.update({
                            where: {
                                location_id: locationId
                            },
                            data: {
                                location_image: file.filename
                            }
                        });
                        return (0, response_template_2.responseObject)(201, "Upload image successfully!", uploadImg);
                    }
                    else {
                        throw new common_1.ForbiddenException((0, response_template_2.responseObject)(403, "Request is invalid", "You don't have permission to access!"));
                    }
                }
                else {
                    throw new common_1.NotFoundException((0, response_template_2.responseObject)(404, "Request is invalid", "User doesn't exist!"));
                }
            }
            else {
                throw new common_1.NotFoundException((0, response_template_2.responseObject)(404, "Request is invalid", "Location not found!"));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async deleteLocation(token, locationId) {
        try {
            const { userId, userRole } = await (0, decoded_token_1.getUserInfoFromToken)(this.jwtService, token);
            let checkLocation = await this.prisma.location.findUnique({
                where: {
                    location_id: locationId
                }
            });
            if (checkLocation) {
                let checkUser = await this.prisma.users.findUnique({
                    where: {
                        user_id: userId
                    }
                });
                if (checkUser) {
                    if (userRole === roles_enum_1.Roles.ADMIN) {
                        await this.prisma.rooms.deleteMany({
                            where: {
                                location_id: locationId
                            }
                        });
                        await this.prisma.location.delete({
                            where: {
                                location_id: locationId
                            }
                        });
                        return (0, response_template_2.responseObject)(200, "Delete location successfully!", null);
                    }
                    else {
                        throw new common_1.ForbiddenException((0, response_template_2.responseObject)(403, "Request is invalid", "You don't have permission to access!"));
                    }
                }
                else {
                    throw new common_1.NotFoundException((0, response_template_2.responseObject)(404, "Request is invalid", "User doesn't exist!"));
                }
            }
            else {
                throw new common_1.NotFoundException((0, response_template_2.responseObject)(404, "Request is invalid", "Location not found!"));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
};
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], LocationService);
//# sourceMappingURL=location.service.js.map