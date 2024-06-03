import { Component } from '@angular/core';
import { HousingCRUDService } from '../../services/housing/housing-crud.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { IHousing } from '../../../interfaces/IHousing';

@Component({
  selector: 'app-get-housing-by-id',
  templateUrl: './get-housing-by-id.component.html',
  styleUrl: './get-housing-by-id.component.css',
})
export class GetHousingByIdComponent {
  constructor(
    private housingId: HousingCRUDService,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
  ) {}
  imageUrl!: string;
  housing!: IHousing;
  id: number = this.activatedRoute.snapshot.params['id'];
  isLoggedIn = false;
  username?: string;
  ownerUsername: string = '';

  ngOnInit() {
    this.getHousingById();
  }

  getHousingById() {
    this.housingId.getHousingById(this.id).subscribe(
      (response) => {
        this.housing = response;
        this.ownerUsername = response.username;
        this.storageService.setOwnerUsername(this.ownerUsername);
        console.log(response);
      },
      (error) => {
        console.error(error);
      },
    );
  }

  onFileChanged(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        (file as any).base64String = base64String;
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  returnHousingCategory() {
    switch (this.housing.category) {
      case 'APARTMENT':
        return 'Appartement';
      case 'HOUSE':
        return 'Maison';
      default:
        return 'Catégorie inconnue';
    }
  }

  returnHousingCondition() {
    if (this.housing.housingCondition) {
      return 'En bon état';
    } else {
      return 'En panne';
    }
  }

  getConditionLabel() {
    switch (this.housing.housingCondition) {
      case 'NECESSARY_RENOVATION':
        return 'Rénovation nécessaire';
      case 'GOOD_CONDITION':
        return 'Bon état';
      case 'PERFECT_CONDITION':
        return 'Excellente condition';
      case 'NEW':
        return 'Nouveau';
      default:
        return 'Condition inconnue';
    }
  }
}
