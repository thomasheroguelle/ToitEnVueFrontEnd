import { Component } from '@angular/core';
import { UserBookings } from '../../../interfaces/IUserBooking';
import { BookingService } from '../../services/booking/booking.service';
import { StatusEnum } from '../../../interfaces/IValidatedBooking';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrl: './user-bookings.component.css',
})
export class UserBookingsComponent {
  bookings: UserBookings[] = [];
  errorMessage: string = '';
  booking!: UserBookings[];
  status: StatusEnum = StatusEnum.confirmed;
  isLoggedIn = false;

  constructor(
    private bookingService: BookingService,
    private storageService: StorageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getBookings();
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigate(['housings']);
    }
  }

  getBookings() {
    this.bookingService.getAllBookingsFromUser().subscribe(
      (data) => {
        this.bookings = data;
        console.log('Bookings data:', this.bookings);
      },
      (error) => {
        this.errorMessage = error;
        console.error('Error fetching bookings:', this.errorMessage);
      },
    );
  }

  getStatusText(status: StatusEnum): string {
    switch (status) {
      case StatusEnum.confirmed:
        return 'Accepté ✅';
      case StatusEnum.rejected:
        return 'Rejeté 👎';
      case StatusEnum.pending:
        return 'En attente 🚀';
      default:
        return '';
    }
  }
}
