import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
export declare class RoomsService {
    private jwtService;
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    constructor(jwtService: JwtService);
    getRooms(): Promise<{
        statusCode: number;
        message: string;
        total: number;
        content: any;
        dateTime: string;
    }>;
    createRoom(token: any, room: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    getRoomsByPagination(pageIndex: any, pageSize: any, keyword: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    getRoomById(roomId: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    getRoomByLocationId(locationId: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    updateRoomByRoomId(roomId: any, token: any, roomInfo: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    deleteRoomByRoomId(roomId: any, token: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    uploadRoomImg(roomId: any, file: any, token: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
}
