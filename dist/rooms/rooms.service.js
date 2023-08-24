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
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const jwt_1 = require("@nestjs/jwt");
const roles_enum_1 = require("../enum/roles.enum");
const response_template_1 = require("../util/response-template");
const decoded_token_1 = require("../util/decoded-token");
let RoomsService = exports.RoomsService = class RoomsService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.prisma = new client_1.PrismaClient();
    }
    async getRooms() {
        try {
            let rooms = await this.prisma.rooms.findMany();
            return (0, response_template_1.responseArray)(200, 'Get all rooms successfully!', rooms.length, rooms);
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async createRoom(token, room) {
        try {
            const { userId, userRole } = await (0, decoded_token_1.getUserInfoFromToken)(this.jwtService, token);
            const { room_name, client_number, bed_room, bed, bath_room, description, price, washing_machine, iron, tivi, air_conditioner, wifi, kitchen, parking, pool, location_id, image } = room;
            let newRoom = {
                room_name,
                client_number,
                bed_room,
                bed,
                bath_room,
                description,
                price,
                washing_machine,
                iron,
                tivi,
                air_conditioner,
                wifi,
                kitchen,
                parking,
                pool,
                location_id,
                image,
            };
            let checkUser = await this.prisma.users.findUnique({
                where: {
                    user_id: userId
                }
            });
            if (checkUser) {
                if (userRole === roles_enum_1.Roles.ADMIN) {
                    let checkLocation = await this.prisma.location.findUnique({
                        where: {
                            location_id
                        }
                    });
                    if (checkLocation) {
                        let createRoom = await this.prisma.rooms.create({
                            data: newRoom
                        });
                        return (0, response_template_1.responseObject)(201, "Create room successfully!", createRoom);
                    }
                    else {
                        throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, "Request is invalid!", "Location not found!"));
                    }
                }
                else {
                    throw new common_1.ForbiddenException((0, response_template_1.responseObject)(403, "Request is invalid", "You don't have permission to access!"));
                }
            }
            else {
                throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, "Request is invalid!", "User doesn't exist!"));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async getRoomsByPagination(pageIndex, pageSize, keyword) {
        try {
            const startIndex = (pageIndex - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            let filteredItems = await this.prisma.rooms.findMany({
                where: {
                    room_name: {
                        contains: keyword,
                    },
                },
            });
            if (filteredItems.length > 0) {
                if (keyword) {
                    filteredItems = filteredItems.filter((item) => item.room_name.toLowerCase().includes(keyword.toLowerCase()));
                }
                const itemSlice = filteredItems.slice(startIndex, endIndex);
                return (0, response_template_1.responseObject)(200, "Get rooms successfully!", {
                    pageIndex,
                    pageSize,
                    totalRow: filteredItems.length,
                    keyword: `Room name LIKE %${keyword}%`,
                    data: itemSlice
                });
            }
            else {
                return (0, response_template_1.responseObject)(200, "No matching results found!", filteredItems);
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async getRoomById(roomId) {
        try {
            let checkRoom = await this.prisma.rooms.findUnique({
                where: {
                    room_id: roomId
                }
            });
            if (checkRoom) {
                return (0, response_template_1.responseObject)(200, "Get room successfully!", checkRoom);
            }
            else {
                throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, 'Request is invalid', "Room not found!"));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async getRoomByLocationId(locationId) {
        try {
            let checkLocation = await this.prisma.location.findUnique({
                where: {
                    location_id: locationId
                }
            });
            if (checkLocation) {
                let getRooms = await this.prisma.rooms.findMany({
                    where: {
                        location_id: locationId,
                    },
                });
                if (getRooms.length > 0) {
                    return (0, response_template_1.responseArray)(200, 'Get room by location successfully!', getRooms.length, getRooms);
                }
                else {
                    return (0, response_template_1.responseObject)(200, "No rooms at this location!", getRooms);
                }
            }
            else {
                throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, "Request is invalid", "Location not found!"));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async updateRoomByRoomId(roomId, token, roomInfo) {
        const { userId, userRole } = await (0, decoded_token_1.getUserInfoFromToken)(this.jwtService, token);
        let { room_name, client_number, bed_room, bed, bath_room, description, price, washing_machine, iron, tivi, air_conditioner, wifi, kitchen, parking, pool, location_id, image } = roomInfo;
        let newRoom = {
            room_name,
            client_number,
            bed_room,
            bed,
            bath_room,
            description,
            price,
            washing_machine,
            iron,
            tivi,
            air_conditioner,
            wifi,
            kitchen,
            parking,
            pool,
            location_id,
            image,
        };
        let checkUser = await this.prisma.users.findUnique({
            where: {
                user_id: userId
            }
        });
        if (checkUser) {
            if (userRole === roles_enum_1.Roles.ADMIN) {
                let checkRoom = await this.prisma.rooms.findUnique({
                    where: {
                        room_id: roomId
                    }
                });
                if (checkRoom) {
                    let checkLocation = await this.prisma.location.findUnique({
                        where: {
                            location_id
                        }
                    });
                    if (checkLocation) {
                        const update = await this.prisma.rooms.update({
                            where: {
                                room_id: roomId
                            },
                            data: newRoom
                        });
                        return (0, response_template_1.responseObject)(200, "Update room successfully!", update);
                    }
                    else {
                        throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, "Request is invalid", "Location not found!"));
                    }
                }
                else {
                    throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, "Request is invalid", "Room not found!"));
                }
            }
            else {
                throw new common_1.ForbiddenException((0, response_template_1.responseObject)(403, "Request is invalid", "You don't have permission to access!"));
            }
        }
        else {
            throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, "Request is invalid", "User doesn't exist!"));
        }
    }
    async deleteRoomByRoomId(roomId, token) {
        try {
            const { userId, userRole } = await (0, decoded_token_1.getUserInfoFromToken)(this.jwtService, token);
            let checkUser = await this.prisma.users.findUnique({
                where: {
                    user_id: userId
                }
            });
            if (checkUser) {
                if (userRole === roles_enum_1.Roles.ADMIN) {
                    let checkRoom = await this.prisma.rooms.findUnique({
                        where: {
                            room_id: roomId
                        }
                    });
                    if (checkRoom) {
                        await this.prisma.reservations.deleteMany({
                            where: {
                                room_id: roomId
                            }
                        });
                        await this.prisma.reviews.deleteMany({
                            where: {
                                room_id: roomId
                            }
                        });
                        await this.prisma.rooms.delete({
                            where: {
                                room_id: roomId
                            }
                        });
                        return (0, response_template_1.responseObject)(200, "Delete room successfully!", null);
                    }
                    else {
                        throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, "Request is invalid", "Room not found!"));
                    }
                }
                else {
                    throw new common_1.ForbiddenException((0, response_template_1.responseObject)(403, "Request is invalid", "You don't have permission to access!"));
                }
            }
            else {
                throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, 'Request is invalid', "User doesn't exist!"));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async uploadRoomImg(roomId, file, token) {
        try {
            const { userId, userRole } = await (0, decoded_token_1.getUserInfoFromToken)(this.jwtService, token);
            let checkRoom = await this.prisma.rooms.findUnique({
                where: {
                    room_id: roomId
                }
            });
            if (checkRoom) {
                let checkUser = await this.prisma.users.findUnique({
                    where: {
                        user_id: userId
                    }
                });
                if (checkUser) {
                    if (userRole === roles_enum_1.Roles.ADMIN) {
                        let roomInfo = await this.prisma.rooms.update({
                            where: {
                                room_id: roomId
                            },
                            data: {
                                image: file.filename,
                            },
                        });
                        return (0, response_template_1.responseObject)(201, "Upload avatar successfully!", roomInfo);
                    }
                    else {
                        throw new common_1.ForbiddenException((0, response_template_1.responseObject)(403, "Request is invalid", "You don't have permission to access!"));
                    }
                }
                else {
                    throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, "Request is invalid", "User doesn't exist!"));
                }
            }
            else {
                throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, "Request is invalid", "Room not found!"));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
};
exports.RoomsService = RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], RoomsService);
//# sourceMappingURL=rooms.service.js.map