import { Injectable } from '@angular/core';
import L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class OpenstreetmapService {
  private map!: L.Map;
  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private mapConfig = {
    center: [48.866667, 2.333333] as L.LatLngExpression,
    zoom: 10,
  };

  getCoordinates(lat: string, long: string) {
    const coordinatesArray: { latitude: string; longitude: string }[] =
      JSON.parse(localStorage.getItem('coordinatesArray') ?? '[]');

    coordinatesArray.push({ latitude: lat, longitude: long });

    localStorage.setItem('coordinatesArray', JSON.stringify(coordinatesArray));
  }

  initMap(): void {
    this.map = L.map('map', this.mapConfig);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(
      this.map,
    );

    const coordinatesArray = JSON.parse(
      localStorage.getItem('coordinatesArray') ?? '[]',
    );

    coordinatesArray.forEach((coordinates: any) => {
      this.addMarker(coordinates.latitude, coordinates.longitude);
    });
  }

  addMarker(latitude: number, longitude: number): void {
    if (this.map && latitude !== undefined && longitude !== undefined) {
      const marker = this.getMarker(latitude, longitude);

      marker.addTo(this.map).openPopup().bindPopup('Nouveau logement publié !');
    }
  }

  getMarker(latitude: number, longitude: number): L.Marker {
    return L.marker([latitude, longitude], {
      icon: L.icon({
        iconUrl: 'assets/openstreetmap/marker.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      }),
    });
  }
}
