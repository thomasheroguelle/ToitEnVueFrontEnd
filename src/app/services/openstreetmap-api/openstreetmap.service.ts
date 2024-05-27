import { Injectable } from '@angular/core';
import L from 'leaflet';
import Geocoder from 'leaflet-control-geocoder';
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

    this.searchControl();

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

  addCircle(latlng: L.LatLng) {
    L.circle(latlng, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500,
    }).addTo(this.map);
  }

  searchControl() {
    if (this.map) {
      const geocoderControl = new Geocoder();

      geocoderControl.addTo(this.map);

      geocoderControl.on('markgeocode', (e: any) => {
        this.map.eachLayer((layer) => {
          if (layer instanceof L.Marker && !this.isSavedHousingMarker(layer)) {
            this.map.removeLayer(layer);
          }
        });

        const latlng = e.geocode.center;
        this.addCircle(latlng);

        console.log(e);
      });
    }
  }

  isSavedHousingMarker(marker: L.Marker): boolean {
    const coordinatesArray = JSON.parse(
      localStorage.getItem('coordinatesArray') || '[]',
    );
    for (const coord of coordinatesArray) {
      if (
        marker.getLatLng().lat === parseFloat(coord.latitude) &&
        marker.getLatLng().lng === parseFloat(coord.longitude)
      ) {
        return true;
      }
    }
    return false;
  }
}
