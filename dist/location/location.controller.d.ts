/// <reference types="multer" />
import { LocationService } from './location.service';
import { UpdateLocationDto } from './dto/update-location.dto';
import { CreateLocationDto } from './dto/create-location.dto';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    getLocations(): Promise<{
        statusCode: number;
        message: string;
        total: number;
        content: any;
        dateTime: string;
    }>;
    createLocation(token: any, location: CreateLocationDto): Promise<{
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
    updateLocation(token: any, locationId: number, updateLocation: UpdateLocationDto): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    getLocationPagination(pageIndex: number, pageSize: number, keyWord: string): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    uploadImage(token: any, locationId: number, file: Express.Multer.File): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    deleteLocation(token: any, locationId: number): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
}
