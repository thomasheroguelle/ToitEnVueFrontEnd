import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByHousingComponent } from './filter-by-housing.component';

describe('FilterByHousingComponent', () => {
  let component: FilterByHousingComponent;
  let fixture: ComponentFixture<FilterByHousingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterByHousingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterByHousingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
