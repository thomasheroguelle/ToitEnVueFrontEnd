import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HousingCRUDService } from '../../services/housing/housing-crud.service';
import {
  CategoryEnum,
  HousingConditionEnum,
} from '../../../interfaces/IHousing';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-housing-form',
  templateUrl: './create-housing-form.component.html',
  styleUrl: './create-housing-form.component.css',
})
export class CreateHousingFormComponent {
  createForm!: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  user_id: number;
  username!: string;
  constructor(
    private fb: FormBuilder,
    private housingService: HousingCRUDService,
    private storageService: StorageService,
    private router: Router,
  ) {
    this.user_id = this.storageService.getUser().id;
    this.username = this.storageService.getUser().username;
  }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      title: [
        'Magnifique appartement situé en centre-ville',
        Validators.required,
      ],
      address: ['14 RUE DE LA BEAUNE', Validators.required],
      zipcode: ['93100', Validators.required],
      city: ['Bordeaux'],
      description: [
        'Située à 10 minutes de Pont Audemer, cette maison contemporaine complètement rénovée en 2020 vous permettra de découvrir facilement la Normandie, elle est parfaitement adaptée pour 4 adultes et 2 enfants. En moins de 45 min vous pourrez visiter Le Marais Vernier, Rouen, Le Havre, Honfleur, Deauville mais aussi en 1 heure Etretat, Giverny, Caen…Vous pourrez profiter du jardin : Piscine chauffée à 28° en été, trampoline, cabane, balançoire et les animaux (poules et chats sur place)',
        Validators.required,
      ],
      category: [CategoryEnum.appartement, Validators.required],
      rooms: ['5', Validators.required],
      bedrooms: ['5', Validators.required],
      bathrooms: ['5', Validators.required],
      furnished: [false, Validators.required],
      living_space: ['5', Validators.required],
      highlights: [[], Validators.required],
      year_of_construction: ['WIFI', Validators.required],
      housingCondition: [
        HousingConditionEnum.good_condition,
        Validators.required,
      ],
      price: ['1200', Validators.required],
      user_id: this.user_id,
      username: this.username,
    });

    console.log(this.user_id);
    console.log(this.username);
    if (!this.isLoggedIn()) {
      alert('Veuillez vous connecter pour accéder au formulaire');
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn(): boolean {
    return this.storageService.isLoggedIn();
  }

  onSubmit(): void {
    if (this.createForm) {
      const createForm = this.createForm.value;
      this.housingService.createHousing(createForm).subscribe(
        (data) => {
          this.isSuccessful = true;
        },
        (error) => {
          this.errorMessage = error;
          this.isSignUpFailed = true;
        },
      );
    }
  }
}
