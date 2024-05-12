import { Component } from '@angular/core';
import { UserHousingService } from '../../services/user-housing.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { IHousing } from '../../../interfaces/IHousing';
import { HousingCRUDService } from '../../services/housing/housing-crud.service';

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
    private housingCrud: HousingCRUDService,
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

  deleteHousing(id: number): void {
    this.housingCrud.deleteHousing(id).subscribe(
      (response) => {
        alert('Annonce supprimée avec succès !');
        window.location.reload();
      },
      (error) => {
        console.error('Une erreur est survenue : ', error);
        if (error.error) {
          this.showAlert(error.error);
          console.log(error.error);
        } else {
          this.showAlert('Une erreur est survenue.');
        }
      },
    );
  }

  showAlert(errorMessage: string): void {
    alert(errorMessage);
    console.log(errorMessage);
  }
}
