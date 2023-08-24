/// <reference types="multer" />
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
export declare class UsersService {
    private jwtService;
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    constructor(jwtService: JwtService);
    getUsers(): Promise<{
        statusCode: number;
        message: string;
        total: number;
        content: any;
        dateTime: string;
    }>;
    createUser(user: any, token: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    deleteUserById(deleteId: any, token: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    getUsersByPagination(pageIndex: any, pageSize: any, keyword: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    getUserById(userId: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    getUserByName(userName: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    updateUser(token: any, userUpdate: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    uploadAvatar(token: any, file: Express.Multer.File): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
}
