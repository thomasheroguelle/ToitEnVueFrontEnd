import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrl: './go-back.component.css',
})
export class GoBackComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['housings']);
  }
}
