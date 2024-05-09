import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingDetailPageComponent } from './housing-detail-page.component';

describe('HousingDetailPageComponent', () => {
  let component: HousingDetailPageComponent;
  let fixture: ComponentFixture<HousingDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HousingDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HousingDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
