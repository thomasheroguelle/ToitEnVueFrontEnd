import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetHousingByIdComponent } from './get-housing-by-id.component';

describe('GetHousingByIdComponent', () => {
  let component: GetHousingByIdComponent;
  let fixture: ComponentFixture<GetHousingByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetHousingByIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetHousingByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
