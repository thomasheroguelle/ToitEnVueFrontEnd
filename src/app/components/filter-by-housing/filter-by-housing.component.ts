import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-by-housing',
  templateUrl: './filter-by-housing.component.html',
  styleUrl: './filter-by-housing.component.css',
})
export class FilterByHousingComponent {
  @Output() filterChange = new EventEmitter<string>();

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.filterChange.emit(target.value.trim());
  }
}
