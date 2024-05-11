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
  housingForm!: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  user_id: number;
  username!: string;
  selectedFiles: File[] = [];
  selectedFilesURL: string[] = [];

  constructor(
    private fb: FormBuilder,
    private housingService: HousingCRUDService,
    private storageService: StorageService,
    private router: Router,
  ) {
    this.user_id = this.storageService.getUser().id;
    this.username = this.storageService.getUser().username;
  }

  housingFormInit() {
    this.housingForm = this.fb.group({
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
  }

  ngOnInit(): void {
    console.log(this.user_id);
    console.log(this.username);
    if (!this.isLoggedIn()) {
      alert('Veuillez vous connecter pour accéder au formulaire');
      this.router.navigate(['/login']);
    }

    this.housingFormInit();
  }

  isLoggedIn(): boolean {
    return this.storageService.isLoggedIn();
  }

  onFileChanged(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        this.selectedFiles.push(file);

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.selectedFilesURL.push(e.target.result as string);
        };

        reader.readAsDataURL(file);
      }
      console.log('Fichiers sélectionnés:', this.selectedFiles);
    }
  }
  private constructHousingObject() {
    return {
      address: this.housingForm.get('address')?.value,
      zipcode: this.housingForm.get('zipcode')?.value,
      city: this.housingForm.get('city')?.value,
      title: this.housingForm.get('title')?.value,
      description: this.housingForm.get('description')?.value,

      category: this.housingForm.get('category')?.value,

      rooms: this.housingForm.get('rooms')?.value,
      bedrooms: this.housingForm.get('bedrooms')?.value,
      bathrooms: this.housingForm.get('bathrooms')?.value,
      furnished: this.housingForm.get('furnished')?.value,

      living_space: this.housingForm.get('living_space')?.value,

      highlights: this.housingForm.get('highlights')?.value,

      year_of_construction: this.housingForm.get('year_of_construction')?.value,

      housingCondition: this.housingForm.get('housingCondition')?.value,

      price: this.housingForm.get('price')?.value,

      user_id: this.user_id,
      username: this.username,
    };
  }

  onSubmit() {
    const newHousing = this.constructHousingObject();

    const formData = new FormData();
    formData.append('housing', JSON.stringify(newHousing));
    this.selectedFiles.forEach((file) => {
      formData.append('files', file);
    });
    this.housingService.createHousing(formData).subscribe(
      (response) => {
        console.log('Réponse du serveur :', response);
      },
      (error) => {
        console.error('Erreur lors de la requête :', error);
      },
    );
  }
}
