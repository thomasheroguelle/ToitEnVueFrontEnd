import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HousingCRUDService } from './housing-crud.service';

describe('HousingCRUDService', () => {
  let service: HousingCRUDService;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'http://localhost:8091/api/v1/housing'; // URL de l'API pour les tests

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import du module HttpClientTestingModule pour les tests HTTP
      providers: [HousingCRUDService], // Injection du service HousingCRUDService comme provider
    });
    service = TestBed.inject(HousingCRUDService); // Injection du service à tester
    httpTestingController = TestBed.inject(HttpTestingController); // Injection du contrôleur HttpTestingController pour effectuer les requêtes HTTP
  });

  afterEach(() => {
    httpTestingController.verify(); // Vérification qu'il n'y a pas de requêtes HTTP non résolues
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Vérifie que le service a été correctement créé
  });

  it('should create housing with files', () => {
    // Données simulées à envoyer
    const formData = new FormData();
    formData.append(
      'housing',
      JSON.stringify({
        housing_id: 1,
        title: 'Magnifique logement',
        address: "5 chemin de l'eau bonne",
        city: 'Dammartin-en-Goele',
        zipcode: 77230,
        description: 'Une magnifique description',
        price: 700,
        category: 'APARTMENT',
        rooms: 5,
        bedrooms: 3,
        bathrooms: 2,
        living_space: 85,
        highlights: ['WIFI', 'PISCINE'],
        year_of_construction: 2015,
        housingCondition: 'NEW',
        user_id: 17,
        username: 'ledevenherbe',
        files: {
          file_id: 1,
          file_name: 'image.png',
          content_type: 'image/png',
        },
      }),
    );
    formData.append('files', new File(['dummy'], '1.jpg')); // Ajout d'un fichier simulé

    // Appel de la méthode createHousing du service
    service.createHousing(formData).subscribe((result) => {
      expect(result).toBeDefined(); // Vérifie que le résultat retourné est défini
    });

    const req = httpTestingController.expectOne(apiUrl); // Attend une seule requête vers l'URL apiUrl
    expect(req.request.method).toEqual('POST'); // Vérifie que la méthode de requête est POST

    req.flush({}); // Fournit une réponse vide à la requête (simulée)
  });
});
