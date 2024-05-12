import { Component } from '@angular/core';
import { UserHousingService } from '../../services/user-housing.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { IHousing } from '../../../interfaces/IHousing';

@Component({
  selector: 'app-user-housing',
  templateUrl: './user-housing.component.html',
  styleUrl: './user-housing.component.css',
})
export class UserHousingComponent {
  userId = this.storageService.getUser().id;
  housesList: IHousing[] = [];

  constructor(
    private userOwner: UserHousingService,
    private storageService: StorageService,
    private route: Router,
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
        console.log(response, 'response');
        this.housesList = response;
        console.log(this.housesList);
      },
      (error) => {
        console.error(error, 'error');
      },
    );
  }
}
