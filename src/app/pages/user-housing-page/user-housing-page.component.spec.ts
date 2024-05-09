import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHousingPageComponent } from './user-housing-page.component';

describe('UserHousingPageComponent', () => {
  let component: UserHousingPageComponent;
  let fixture: ComponentFixture<UserHousingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserHousingPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserHousingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
