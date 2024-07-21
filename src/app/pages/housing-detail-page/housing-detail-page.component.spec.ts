import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingDetailPageComponent } from './housing-detail-page.component';
import { GoBackComponent } from '../../components/go-back/go-back.component';

describe('HousingDetailPageComponent', () => {
  let component: HousingDetailPageComponent;
  let fixture: ComponentFixture<HousingDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HousingDetailPageComponent,  GoBackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HousingDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
