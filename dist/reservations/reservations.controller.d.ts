import { ReservationsService } from './reservations.service';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CreateReservationDto } from './dto/create-reservation.dto';
export declare class ReservationsController {
    private readonly reservationsService;
    constructor(reservationsService: ReservationsService);
    getReservation(): Promise<{
        statusCode: number;
        message: string;
        total: number;
        content: any;
        dateTime: string;
    }>;
    createReservation(token: any, reservation: CreateReservationDto): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    getReservationById(reservationId: number): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    getReservationByUserId(userId: number): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    updateReservation(reservationId: number, token: any, reservationUpdate: UpdateReservationDto): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
    deleteReservation(reservationId: number, token: any): Promise<{
        statusCode: number;
        message: string;
        content: any;
        dateTime: string;
    }>;
}
