import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingListPageComponent } from './housing-list-page.component';
import { ToggleViewComponent } from '../../components/toggle-view/toggle-view.component';

describe('HousingListPageComponent', () => {
  let component: HousingListPageComponent;
  let fixture: ComponentFixture<HousingListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HousingListPageComponent, ToggleViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HousingListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
