import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
export declare class ReviewsService {
    private jwtService;
    constructor(jwtService: JwtService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getReviews(): Promise<{
        statusCode: number;
        message: string;
        total: number;
        content: any;
        dateTime: string;
    }>;
    createReview(token: any, newReview: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    updateReview(token: any, reviewId: any, reviewUpdate: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    getReviewByRoom(roomId: any): Promise<{
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
