import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingCreatePageComponent } from './housing-create-page.component';

describe('HousingCreatePageComponent', () => {
  let component: HousingCreatePageComponent;
  let fixture: ComponentFixture<HousingCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HousingCreatePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HousingCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
