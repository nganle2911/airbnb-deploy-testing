import { ReviewsService } from './reviews.service';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    getReviews(): Promise<{
        statusCode: number;
        message: string;
        total: number;
        content: any;
        dateTime: string;
    }>;
    createReview(token: any, newReview: CreateReviewDto): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    updateReview(token: any, reviewId: number, reviewUpdate: UpdateReviewDto): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    getReviewByRoom(roomId: Number): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    deleteReviewByReviewId(reviewId: any, token: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
}
