import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toggle-view',
  templateUrl: './toggle-view.component.html',
  styleUrl: './toggle-view.component.css',
})
export class ToggleViewComponent {
  constructor(private route: Router) {}

  isOnProductsPage(): boolean {
    const currentUrl = this.route.url;
    if (currentUrl === '/housings') {
      return true;
    } else return false;
  }
  isOnMapPage(): boolean {
    const currentUrl = this.route.url;
    if (currentUrl === '/map') {
      return true;
    } else return false;
  }
}
