import { Component, Input } from '@angular/core';
import { BookingService } from '../../services/booking/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingCRUDService } from '../../services/housing/housing-crud.service';
import { StorageService } from '../../services/storage/storage.service';
import { IHousing } from '../../../interfaces/IHousing';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { IBookingDetails } from '../../../interfaces/IBookingDetails';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent {
  housingId: number = this.activatedRoute.snapshot.params['id'];
  beginningDate!: Date;
  endDate!: Date;
  isLoggedIn = false;
  ownerUsername!: string;
  currentDate!: string;
  @Input() housingData!: IHousing;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private bookingService: BookingService,
    private activatedRoute: ActivatedRoute,
    private housingService: HousingCRUDService,
    private storageService: StorageService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.currentDate = this.getCurrentDate();
  }

  ngOnInit() {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.getOwnerUserName();
    console.log(this.currentDate);
    console.log(this.housingId);
    this.getReservations();
  }

  makeBooking() {
    this.bookingService
      .makeBooking(this.housingId, this.beginningDate, this.endDate)
      .subscribe(
        () => {
          console.log('Réservation réussie');
          this.snackBar.open(
            'Votre réservation a bien été enregistrée 🎉',
            'Fermer',
            {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['success-snackbar'],
            },
          );
        },
        (error) => {
          console.error(error);
          this.snackBar.open(
            "Une erreur s'est produite lors de la réservation...",
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

  getReservations(): void {
    this.bookingService.getBookingsByHousingId(this.housingId).subscribe(
      (data: IBookingDetails[]) => {
        console.log('Dates réservées', data);
      },
      (error) => {
        console.error(error);
      },
    );
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getOwnerUserName() {
    this.housingService.getHousingById(this.housingId).subscribe((response) => {
      this.ownerUsername = response.username;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      panelClass: 'custom-mat-dialog',
      data: {
        bookingComponent: this,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('La popup a été fermée');
    });
  }
}
