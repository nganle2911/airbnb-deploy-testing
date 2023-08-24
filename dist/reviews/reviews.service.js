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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const roles_enum_1 = require("../enum/roles.enum");
const decoded_token_1 = require("../util/decoded-token");
const response_template_1 = require("../util/response-template");
let ReviewsService = exports.ReviewsService = class ReviewsService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.prisma = new client_1.PrismaClient();
    }
    async getReviews() {
        try {
            const reviews = await this.prisma.reviews.findMany();
            return (0, response_template_1.responseArray)(200, "Get reviews successfully!", reviews.length, reviews);
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async createReview(token, newReview) {
        try {
            const { userId } = await (0, decoded_token_1.getUserInfoFromToken)(this.jwtService, token);
            const { room_id, content, rating } = newReview;
            const newData = {
                room_id,
                user_id: userId,
                review_date: new Date(),
                content,
                rating,
            };
            let checkUser = await this.prisma.users.findUnique({
                where: {
                    user_id: userId
                }
            });
            if (checkUser) {
                let checkRoom = await this.prisma.rooms.findUnique({
                    where: {
                        room_id
                    }
                });
                if (checkRoom) {
                    let review = await this.prisma.reviews.create({
                        data: newData,
                    });
                    return (0, response_template_1.responseObject)(201, "Create review successfully!", review);
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
    async updateReview(token, reviewId, reviewUpdate) {
        try {
            const { userId, userRole } = await (0, decoded_token_1.getUserInfoFromToken)(this.jwtService, token);
            let checkReview = await this.prisma.reviews.findUnique({
                where: {
                    review_id: reviewId
                }
            });
            if (checkReview) {
                if (userId === checkReview.user_id || userRole === roles_enum_1.Roles.ADMIN) {
                    const { room_id, content, rating } = reviewUpdate;
                    let newReview = {
                        room_id,
                        review_date: new Date(),
                        content,
                        rating
                    };
                    let checkRoom = await this.prisma.rooms.findUnique({
                        where: {
                            room_id
                        }
                    });
                    if (checkRoom) {
                        const update = await this.prisma.reviews.update({
                            where: {
                                review_id: reviewId
                            },
                            data: newReview
                        });
                        return (0, response_template_1.responseObject)(200, "Update review successfully!", update);
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
                throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, "Request is invalid", "Review not found!"));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async getReviewByRoom(roomId) {
        try {
            let checkRoom = await this.prisma.rooms.findUnique({
                where: {
                    room_id: roomId,
                },
            });
            if (checkRoom) {
                let checkRoomInReview = await this.prisma.reviews.findMany({
                    where: {
                        room_id: roomId
                    },
                });
                if (checkRoomInReview.length > 0) {
                    let data = await this.prisma.reviews.findMany({
                        where: {
                            room_id: roomId,
                        },
                        include: {
                            users: true,
                            rooms: true,
                        },
                    });
                    let newData = data.map((review) => {
                        return {
                            review_id: review.review_id,
                            user_name: review.users.full_name,
                            room_name: review.rooms.room_name,
                            content: review.content,
                            date: review.review_date,
                            rating: review.rating
                        };
                    });
                    return (0, response_template_1.responseArray)(200, "Get reviews successfully!", data.length, newData);
                }
                else {
                    return (0, response_template_1.responseObject)(200, "This room doesn't have any reviews yet!", checkRoomInReview);
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
    async deleteReviewByReviewId(reviewId, token) {
        try {
            const { userId, userRole } = await (0, decoded_token_1.getUserInfoFromToken)(this.jwtService, token);
            let checkReview = await this.prisma.reviews.findUnique({
                where: {
                    review_id: reviewId
                }
            });
            if (checkReview) {
                if (userId === checkReview.user_id || userRole === roles_enum_1.Roles.ADMIN) {
                    await this.prisma.reviews.delete({
                        where: {
                            review_id: reviewId
                        }
                    });
                    return (0, response_template_1.responseObject)(200, "Delete review successfully!", null);
                }
                else {
                    throw new common_1.ForbiddenException((0, response_template_1.responseObject)(403, "Request is invalid", "You don't have permission to access!"));
                }
            }
            else {
                throw new common_1.NotFoundException((0, response_template_1.responseObject)(404, "Request is invalid", "Review not found!"));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
};
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map