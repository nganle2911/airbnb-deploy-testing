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
exports.ReviewsController = void 0;
const reviews_service_1 = require("./reviews.service");
const swagger_1 = require("@nestjs/swagger");
const update_review_dto_1 = require("./dto/update-review.dto");
const common_1 = require("@nestjs/common");
const create_review_dto_1 = require("./dto/create-review.dto");
let ReviewsController = exports.ReviewsController = class ReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    getReviews() {
        return this.reviewsService.getReviews();
    }
    createReview(token, newReview) {
        return this.reviewsService.createReview(token, newReview);
    }
    updateReview(token, reviewId, reviewUpdate) {
        return this.reviewsService.updateReview(token, Number(reviewId), reviewUpdate);
    }
    getReviewByRoom(roomId) {
        return this.reviewsService.getReviewByRoom(+roomId);
    }
    deleteReviewByReviewId(reviewId, token) {
        return this.reviewsService.deleteReviewByReviewId(Number(reviewId), token);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "getReviews", null);
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
    __metadata("design:paramtypes", [Object, create_review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "createReview", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'token',
        description: 'Your authentication token',
        required: true,
    }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Headers)('token')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_review_dto_1.UpdateReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "updateReview", null);
__decorate([
    (0, common_1.Get)('reviews-by-room/:room_id'),
    __param(0, (0, common_1.Param)('room_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "getReviewByRoom", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'token',
        description: 'Your authentication token',
        required: true,
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        required: true
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "deleteReviewByReviewId", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, swagger_1.ApiTags)('Reviews'),
    (0, common_1.Controller)('api/reviews'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
//# sourceMappingURL=reviews.controller.js.map