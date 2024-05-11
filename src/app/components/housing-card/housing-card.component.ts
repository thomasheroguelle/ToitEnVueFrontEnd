import { Component, Input } from '@angular/core';
import { IHousing } from '../../../interfaces/IHousing';

@Component({
  selector: 'app-housing-card',
  templateUrl: './housing-card.component.html',
  styleUrl: './housing-card.component.css',
})
export class HousingCardComponent {
  @Input() house!: IHousing;
}
