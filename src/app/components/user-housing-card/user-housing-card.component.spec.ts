import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHousingCardComponent } from './user-housing-card.component';

describe('UserHousingCardComponent', () => {
  let component: UserHousingCardComponent;
  let fixture: ComponentFixture<UserHousingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserHousingCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserHousingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
