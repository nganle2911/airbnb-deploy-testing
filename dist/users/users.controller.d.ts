/// <reference types="multer" />
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<{
        statusCode: number;
        message: string;
        total: number;
        content: any;
        dateTime: string;
    }>;
    createUser(user: CreateUserDto, token: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    deleteUserById(deleteId: number, token: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    getUsersByPagination(pageIndex: number, pageSize: number, keyword: string): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    getUserById(userId: number): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    getUserByName(userName: string): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    updateUser(token: any, userUpdate: UpdateUserDto): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    uploadAvatar(file: Express.Multer.File, token: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
}
