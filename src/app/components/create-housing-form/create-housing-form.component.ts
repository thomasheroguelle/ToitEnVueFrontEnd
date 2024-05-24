import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HousingCRUDService } from '../../services/housing/housing-crud.service';
import {
  CategoryEnum,
  HIGHLIGHTS,
  HighLights,
  HousingConditionEnum,
} from '../../../interfaces/IHousing';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { GeolocalisationService } from '../../services/geolocalisation.service';

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
  roomsCounter = 1;
  bedroomsCounter = 1;
  bathroomsCounter = 1;
  currentStep = 1;
  selectedHighlights: string[] = [];
  selectedCondition: string = HousingConditionEnum.good_condition;
  typeOfHousing: string[] = [CategoryEnum.appartement, CategoryEnum.maison];
  highLights: HighLights[] = HIGHLIGHTS;
  housingConditions = Object.values(HousingConditionEnum);

  constructor(
    private fb: FormBuilder,
    private housingService: HousingCRUDService,
    private storageService: StorageService,
    private router: Router,
    public geolocalisation: GeolocalisationService,
  ) {
    this.user_id = this.storageService.getUser().id;
    this.username = this.storageService.getUser().username;
  }

  ngOnInit() {
    console.log(this.user_id);
    console.log(this.username);
    if (!this.isLoggedIn()) {
      alert('Veuillez vous connecter pour accéder au formulaire');
      this.router.navigate(['/login']);
    }
    this.housingFormInit();
  }

  private constructHousingObject() {
    return {
      address: this.housingForm.get('one.address')?.value,
      zipcode: this.housingForm.get('one.zipcode')?.value,
      city: this.housingForm.get('one.city')?.value,
      title: this.housingForm.get('one.title')?.value,
      description: this.housingForm.get('one.description')?.value,

      category: this.housingForm.get('two.category')?.value,

      rooms: this.housingForm.get('three.rooms')?.value,
      bedrooms: this.housingForm.get('three.bedrooms')?.value,
      bathrooms: this.housingForm.get('three.bathrooms')?.value,

      living_space: this.housingForm.get('four.living_space')?.value,

      highlights: this.housingForm.get('five.highlights')?.value,

      year_of_construction: this.housingForm.get('six.year_of_construction')
        ?.value,

      housingCondition: this.housingForm.get('seven.housingCondition')?.value,

      price: this.housingForm.get('eight.price')?.value,

      user_id: this.user_id,
      username: this.username,
    };
  }

  housingFormInit() {
    this.housingForm = this.fb.group({
      one: this.fb.group({
        title: ['', Validators.required],
        address: ['', Validators.required],
        zipcode: ['', Validators.required],
        city: [''],
        description: ['', Validators.required],
      }),
      two: this.fb.group({
        category: [CategoryEnum.appartement, Validators.required],
      }),
      three: this.fb.group({
        rooms: [this.roomsCounter, Validators.required],
        bedrooms: [this.bedroomsCounter, Validators.required],
        bathrooms: [this.bathroomsCounter, Validators.required],
      }),
      four: this.fb.group({
        living_space: ['', Validators.required],
      }),
      five: this.fb.group({
        highlights: [this.selectedHighlights, Validators.required],
      }),
      six: this.fb.group({
        year_of_construction: ['', Validators.required],
      }),
      seven: this.fb.group({
        housingCondition: [
          HousingConditionEnum.good_condition,
          Validators.required,
        ],
      }),
      eight: this.fb.group({
        price: ['', Validators.required],
      }),
    });
  }

  onSubmit() {
    if (this.currentStep === 8) {
      this.geolocalisation.getAddressData(
        this.housingForm.get('one.address')?.value,
        this.housingForm.get('one.city')?.value,
        this.housingForm.get('one.zipcode')?.value,
      );
      const newHousing = this.constructHousingObject();

      const formData = new FormData();
      formData.append('housing', JSON.stringify(newHousing));
      this.selectedFiles.forEach((file) => {
        formData.append('files', file);
      });
      this.housingService.createHousing(formData).subscribe(
        (response) => {
          console.log('Réponse du serveur :', response);

          const newHousingId = response.housing_id;
          this.housingService.setNewHousingId(newHousingId);

          this.router.navigate(['/success-page', newHousingId]);
        },
        (error) => {
          console.error('Erreur lors de la requête :', error);
        },
      );
    }
  }

  isLoggedIn(): boolean {
    return this.storageService.isLoggedIn();
  }

  formatHousingConditionLabel(condition: string): string {
    switch (condition) {
      case HousingConditionEnum.necessary_renovation:
        return 'Rénovation nécessaire';
      case HousingConditionEnum.good_condition:
        return 'Bonne condition';
      case HousingConditionEnum.perfect_condition:
        return 'Excellente condition';
      case HousingConditionEnum.new:
        return 'Neuf';
      default:
        return condition;
    }
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

  deleteSelectedImage(index: number) {
    this.selectedFilesURL.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  updateSelected(highlight: HighLights): void {
    const index = this.selectedHighlights.indexOf(highlight.title);
    if (index === -1) {
      this.selectedHighlights.push(highlight.title);
    } else {
      this.selectedHighlights.splice(index, 1);
    }
    console.log('Éléments sélectionnés:', this.selectedHighlights);
  }

  prevStep() {
    this.currentStep--;
  }
  nextStep() {
    this.currentStep++;
  }

  roomsIncrement() {
    this.roomsCounter++;
    this.housingForm.get('three.rooms')?.setValue(this.roomsCounter);
    console.log(this.roomsCounter);
  }
  roomsDecrement() {
    if (this.roomsCounter > 1) {
      this.roomsCounter--;
      this.housingForm.get('three.rooms')?.setValue(this.roomsCounter);
      console.log(this.roomsCounter);
    }
  }
  bedroomsIncrement() {
    this.bedroomsCounter++;
    this.housingForm.get('three.bedrooms')?.setValue(this.bedroomsCounter);
    console.log(this.bedroomsCounter);
  }

  bedroomsDecrement() {
    if (this.bedroomsCounter > 1) {
      this.bedroomsCounter--;
      this.housingForm.get('three.bedrooms')?.setValue(this.bedroomsCounter);
      console.log(this.bedroomsCounter);
    }
  }
  bathroomIncrement() {
    this.bathroomsCounter++;
    this.housingForm.get('three.bathrooms')?.setValue(this.bathroomsCounter);
    console.log(this.bathroomsCounter);
  }
  bathroomDecrement() {
    if (this.bathroomsCounter > 1) {
      this.bathroomsCounter--;
      this.housingForm.get('three.bathrooms')?.setValue(this.bathroomsCounter);
      console.log(this.bathroomsCounter);
    }
  }
  categoryValue(category: string) {
    if (this.housingForm) {
      this.housingForm.get('two.category')?.setValue(category);
      this.currentStep++;
    }
  }
  housingConditionValue(condition: string) {
    this.selectedCondition = condition;
    console.log(this.selectedCondition);
  }
}
