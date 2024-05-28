import { Component } from '@angular/core';
import { OpenstreetmapService } from '../../services/openstreetmap-api/openstreetmap.service';

@Component({
  selector: 'app-openstreetmap',
  templateUrl: './openstreetmap.component.html',
  styleUrl: './openstreetmap.component.css',
})
export class OpenstreetmapComponent {
  constructor(private mapService: OpenstreetmapService) {}

  ngOnInit() {
    this.myMap();
  }
  myMap() {
    this.mapService.initMap();
  }
}
