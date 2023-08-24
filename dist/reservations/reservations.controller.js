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
exports.ReservationsController = void 0;
const reservations_service_1 = require("./reservations.service");
const update_reservation_dto_1 = require("./dto/update-reservation.dto");
const swagger_1 = require("@nestjs/swagger");
const create_reservation_dto_1 = require("./dto/create-reservation.dto");
const common_1 = require("@nestjs/common");
let ReservationsController = exports.ReservationsController = class ReservationsController {
    constructor(reservationsService) {
        this.reservationsService = reservationsService;
    }
    getReservation() {
        return this.reservationsService.getReservation();
    }
    createReservation(token, reservation) {
        return this.reservationsService.createReservation(token, reservation);
    }
    getReservationById(reservationId) {
        return this.reservationsService.getReservationById(Number(reservationId));
    }
    getReservationByUserId(userId) {
        return this.reservationsService.getReservationByUserId(Number(userId));
    }
    updateReservation(reservationId, token, reservationUpdate) {
        return this.reservationsService.updateReservation(+reservationId, token, reservationUpdate);
    }
    deleteReservation(reservationId, token) {
        return this.reservationsService.deleteReservation(Number(reservationId), token);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "getReservation", null);
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
    __metadata("design:paramtypes", [Object, create_reservation_dto_1.CreateReservationDto]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "createReservation", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "getReservationById", null);
__decorate([
    (0, common_1.Get)('reservation-by-user/:user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "getReservationByUserId", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'token',
        description: 'Your authentication token',
        required: true,
    }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('token')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, update_reservation_dto_1.UpdateReservationDto]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "updateReservation", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: "token",
        description: "Your authentication token",
        required: true
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "deleteReservation", null);
exports.ReservationsController = ReservationsController = __decorate([
    (0, swagger_1.ApiTags)('Reservations'),
    (0, common_1.Controller)('api/reservations'),
    __metadata("design:paramtypes", [reservations_service_1.ReservationsService])
], ReservationsController);
//# sourceMappingURL=reservations.controller.js.map