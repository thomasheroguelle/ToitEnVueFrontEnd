import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHousingFormComponent } from './create-housing-form.component';

describe('CreateHousingFormComponent', () => {
  let component: CreateHousingFormComponent;
  let fixture: ComponentFixture<CreateHousingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateHousingFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateHousingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
