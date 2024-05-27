import { Component } from '@angular/core';
import { UserHousingService } from '../../services/user-owner/user-housing.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { IHousing } from '../../../interfaces/IHousing';
import { HousingCRUDService } from '../../services/housing/housing-crud.service';
import { BookingService } from '../../services/booking/booking.service';

@Component({
  selector: 'app-user-housing',
  templateUrl: './user-housing.component.html',
  styleUrl: './user-housing.component.css',
})
export class UserHousingComponent {
  userId = this.storageService.getUser().id;
  userHousesList: IHousing[] = [];

  constructor(
    private userOwner: UserHousingService,
    private housingCrud: HousingCRUDService,
    private storageService: StorageService,
    private route: Router,
    private bookingService: BookingService,
  ) {}

  isLoggedIn(): boolean {
    return this.storageService.isLoggedIn();
  }

  ngOnInit() {
    if (this.userId && this.isLoggedIn()) {
      this.getHouses();
    } else {
      alert('Vous devez être authentifié pour accéder à cette page');
      this.route.navigate(['/login']);
    }
  }

  getHouses(): void {
    this.userOwner.getHousingByUserId(this.userId).subscribe(
      (response) => {
        this.userHousesList = response;
      },
      (error) => {
        console.error(error, 'error');
      },
    );
  }

  onHouseDeleted(): void {
    this.getHouses();
  }

  showAlert(errorMessage: string): void {
    alert(errorMessage);
    console.log(errorMessage);
  }
}
