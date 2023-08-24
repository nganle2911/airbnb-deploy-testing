import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
export declare class LocationService {
    private jwtService;
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    constructor(jwtService: JwtService);
    getLocations(): Promise<{
        statusCode: number;
        message: string;
        total: number;
        content: any;
        dateTime: string;
    }>;
    createLocation(token: any, location: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    getLocationByLocationId(locationId: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    updateLocation(token: any, locationId: any, updateLocation: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    getLocationPagination(pageIndex: any, pageSize: any, keyword: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    uploadImage(token: any, locationId: any, file: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    deleteLocation(token: any, locationId: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
}
