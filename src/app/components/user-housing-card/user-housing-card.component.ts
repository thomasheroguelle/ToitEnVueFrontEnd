import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { BookingService } from '../../services/booking/booking.service';
import { IHousing } from '../../../interfaces/IHousing';
import { HousingCRUDService } from '../../services/housing/housing-crud.service';
import { OwnerChoice, StatusEnum } from '../../../interfaces/IValidatedBooking';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { IBookingDetails } from '../../../interfaces/IBookingDetails';

@Component({
  selector: 'app-user-housing-card',
  templateUrl: './user-housing-card.component.html',
  styleUrl: './user-housing-card.component.css',
})
export class UserHousingCardComponent {
  @Input() userHouses!: IHousing;
  @Output() houseDeleted = new EventEmitter<void>();

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  bookings: IBookingDetails[] = [];
  status = Object.values(StatusEnum);
  bookingIds: number[] = [];

  constructor(
    private bookingService: BookingService,
    private housingCrud: HousingCRUDService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService
      .getBookingsByHousingId(this.userHouses.housing_id)
      .subscribe(
        (data: IBookingDetails[]) => {  // data est un tableau
          this.bookings = data;
          this.bookingIds = data.map((booking) => booking.id);
  
          console.log(
            'Réservations pour le logement : ',
            this.userHouses.housing_id,
            this.bookings,
          );
        },
        (error) => {
          this.snackBar.open(
            'Une erreur est survenue lors du chargement des réservations.',
            'Fermer',
            {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['error-snackbar'],
            },
          );
        },
      );
  }
  

  deleteHousing(): void {
    this.housingCrud.deleteHousing(this.userHouses.housing_id).subscribe(
      () => {
        this.snackBar.open('Annonce supprimée avec succès !', 'Fermer', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.houseDeleted.emit();
      },
      (error) => {
        console.error('Une erreur est survenue : ', error);
        this.snackBar.open(
          'Une erreur est survenue lors de la suppression.',
          'Fermer',
          {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['error-snackbar'],
          },
        );
      },
    );
  }

  confirmBooking(bookingId: number): void {
    const ownerChoice: OwnerChoice = {
      bookingId: bookingId,
      bookingStatus: StatusEnum.confirmed,
    };

    this.bookingService.ownerChoice(ownerChoice).subscribe(
      () => {
        this.snackBar.open('Réservation confirmée avec succès !', 'Fermer', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.loadBookings();
      },
      (error) => {
        console.error(error);
        this.snackBar.open(
          'Une erreur est survenue lors de la confirmation de la réservation.',
          'Fermer',
          {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['error-snackbar'],
          },
        );
      },
    );
  }

  cancelBooking(bookingId: number): void {
    const ownerChoice: OwnerChoice = {
      bookingId: bookingId,
      bookingStatus: StatusEnum.rejected,
    };

    this.bookingService.ownerChoice(ownerChoice).subscribe(
      () => {
        this.snackBar.open('Vous avez annulé cette réservation', 'Fermer', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
        this.loadBookings();
      },
      (error) => {
        console.error(error);
        this.snackBar.open(
          "Une erreur est survenue lors de l'annulation de la réservation.",
          'Fermer',
          {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['error-snackbar'],
          },
        );
      },
    );
  }
}
