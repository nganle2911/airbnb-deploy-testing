import { AuthService } from './auth.service';
import { PrismaClient } from '@prisma/client';
import { CreateAuthDto, LoginType } from './dto/create-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    signUp(userSignup: CreateAuthDto): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    login(userLogin: LoginType): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
}
