import { Component, Input } from '@angular/core';
import { IHousing } from '../../../interfaces/IHousing';
import { Observable } from 'rxjs';
import { HousingCRUDService } from '../../services/housing/housing-crud.service';

@Component({
  selector: 'app-housing-list',
  templateUrl: './housing-list.component.html',
  styleUrl: './housing-list.component.css',
})
export class HousingListComponent {
  housesList: IHousing[] = [];
  filteredLocationList: IHousing[] = [];

  constructor(private allHousingList: HousingCRUDService) {}

  ngOnInit() {
    this.getHouses();
  }

  getHouses(): Observable<IHousing[]> {
    this.allHousingList.getHousingList().subscribe(
      (response) => {
        console.log(response, 'housings');
        this.housesList = response;
      },
      (error) => {
        console.error(error, 'erreur');
      },
    );
    return this.allHousingList.getHousingList();
  }

  filterResults(text: string) {
    this.filteredLocationList = text.trim()
      ? this.housesList.filter((housingLocation) =>
          housingLocation.city.toLowerCase().includes(text.toLowerCase()),
        )
      : this.housesList;
    if (this.filteredLocationList.length === 0) {
      alert('Aucune recherche associée');
    }
  }
}
