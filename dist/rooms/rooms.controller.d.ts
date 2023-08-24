/// <reference types="multer" />
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    getRooms(): Promise<{
        statusCode: number;
        message: string;
        total: number;
        content: any;
        dateTime: string;
    }>;
    createRoom(token: any, room: CreateRoomDto): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    getRoomsByPagination(pageIndex: number, pageSize: number, keyword: string): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    getRoomById(roomId: number): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    getRoomByLocationId(locationId: number): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    updateRoomByRoomId(roomId: any, token: any, roomInfo: UpdateRoomDto): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    deleteRoomByRoomId(roomId: number, token: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    uploadAvatar(roomId: number, file: Express.Multer.File, token: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
}
