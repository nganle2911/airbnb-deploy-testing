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
exports.ReservationsService = void 0;
const response_template_1 = require("./../util/response-template");
const client_1 = require("@prisma/client");
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const decoded_token_1 = require("../util/decoded-token");
let ReservationsService = exports.ReservationsService = class ReservationsService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.prisma = new client_1.PrismaClient();
    }
    async getReservation() {
        try {
            const reservations = await this.prisma.reservations.findMany();
            return (0, response_template_1.responseArray)(200, 'Get all reservations successfully!', reservations.length, reservations);
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async createReservation(token, reservation) {
        try {
            const { userId } = await (0, decoded_token_1.getUserInfoFromToken)(this.jwtService, token);
            let { room_id, guest_amount } = reservation;
            let newReservation = {
                room_id,
                start_date: new Date(),
                end_date: new Date(),
                guest_amount,
                user_id: userId
            };
            let checkUser = await this.prisma.users.findUnique({
                where: {
                    user_id: userId
                }
            });
            if (checkUser) {
                let findRoom = await this.prisma.rooms.findUnique({
                    where: {
                        room_id
                    }
                });
                if (findRoom) {
                    let bookRoom = await this.prisma.reservations.create({
                        data: newReservation
                    });
                    return (0, response_template_1.responseObject)(201, "Book room successfully!", bookRoom);
                }
                else {
                    throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, "Request is invalid", "Room not found!"));
                }
            }
            else {
                throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, "Request is invalid", "User doesn't exist!"));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async getReservationById(reservationId) {
        try {
            let checkReservation = await this.prisma.reservations.findUnique({
                where: {
                    reservation_id: reservationId,
                },
            });
            if (checkReservation) {
                return (0, response_template_1.responseObject)(200, 'Get reservation successfully!', checkReservation);
            }
            else {
                throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, 'Request is invalid', "Reservation not found!"));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async getReservationByUserId(userId) {
        try {
            let checkUser = await this.prisma.users.findUnique({
                where: {
                    user_id: userId
                }
            });
            if (checkUser) {
                let checkReservation = await this.prisma.reservations.findMany({
                    where: {
                        user_id: userId,
                    },
                });
                if (checkReservation.length > 0) {
                    return (0, response_template_1.responseArray)(200, "Get reservations successfully!", checkReservation.length, checkReservation);
                }
                else {
                    return (0, response_template_1.responseObject)(200, "This user hasn't booked any room yet!", checkReservation);
                }
            }
            else {
                throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, "Request is invalid", "User not found"));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async updateReservation(reservationId, token, reservationUpdate) {
        try {
            const { userId } = await (0, decoded_token_1.getUserInfoFromToken)(this.jwtService, token);
            const { room_id, start_date, end_date, guest_amount } = reservationUpdate;
            let newData = {
                room_id,
                start_date,
                end_date,
                guest_amount,
            };
            let checkReservation = await this.prisma.reservations.findUnique({
                where: {
                    reservation_id: reservationId,
                },
            });
            if (checkReservation) {
                if (userId === checkReservation.user_id) {
                    let checkRoom = await this.prisma.rooms.findUnique({
                        where: {
                            room_id
                        }
                    });
                    if (checkRoom) {
                        const update = await this.prisma.reservations.update({
                            where: {
                                reservation_id: reservationId
                            },
                            data: newData
                        });
                        return (0, response_template_1.responseObject)(200, "Update reservation successfully!", update);
                    }
                    else {
                        throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, "Request is invalid", "Room not found"));
                    }
                }
                else {
                    throw new common_1.ForbiddenException((0, response_template_1.responseObject)(403, "Request is invalid", "You don't have permission to access!"));
                }
            }
            else {
                throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, 'Request is invalid', "Reservation not found!"));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async deleteReservation(reservationId, token) {
        const { userId } = await (0, decoded_token_1.getUserInfoFromToken)(this.jwtService, token);
        let checkReservation = await this.prisma.reservations.findUnique({
            where: {
                reservation_id: reservationId,
            },
        });
        if (checkReservation) {
            if (userId === checkReservation.user_id) {
                await this.prisma.reservations.delete({
                    where: {
                        reservation_id: reservationId,
                    },
                });
                return (0, response_template_1.responseObject)(200, "Delete reservation successfully!", null);
            }
            else {
                throw new common_1.ForbiddenException((0, response_template_1.responseObject)(403, "Request is invalid", "You don't have permission to access!"));
            }
        }
        else {
            throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, "Request is invalid", "Reservation not found!"));
        }
    }
};
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], ReservationsService);
//# sourceMappingURL=reservations.service.js.map