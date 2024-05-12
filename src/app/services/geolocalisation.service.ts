import { Injectable } from '@angular/core';
import { OpenstreetmapService } from './openstreetmap.service';
import { IAdressData } from '../../interfaces/IAdressData';

@Injectable({
  providedIn: 'root',
})
export class GeolocalisationService {
  addressData: {
    address: string;
    zipcode: string;
    city: string;
    latitude: number;
    longitude: number;
  }[] = [];
  constructor(private openStreetMap: OpenstreetmapService) {}

  getAddressData(address: string, city: string, zipcode: string) {
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${address},${city},${zipcode}&limit=1`;

    fetch(apiUrl, { method: 'get' })
      .then((response) => response.json())
      .then((data: any) => {
        if (data && data.length > 0) {
          const firstResult = data[0];
          const newAddressData: IAdressData = {
            address: firstResult.display_name,
            zipcode: firstResult.address ? firstResult.address.postcode : '',
            city: firstResult.address ? firstResult.address.city : '',
            latitude: parseFloat(firstResult.lat),
            longitude: parseFloat(firstResult.lon),
          };
          this.addressData = [newAddressData];

          this.openStreetMap.getCoordinates(
            this.addressData[0].latitude.toString(),
            this.addressData[0].longitude.toString(),
          );
          this.openStreetMap.addMarker(
            this.addressData[0].latitude,
            this.addressData[0].longitude,
          );
          console.log(
            'latitude',
            this.addressData[0].latitude,
            'longitude',
            this.addressData[0].longitude,
          );
        } else {
          console.log('Adresse introuvable.');
          this.addressData = [];
        }
      })
      .catch((err) => {
        console.error(err);
        this.addressData = [];
      });
  }
}
