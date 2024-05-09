import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenstreetmapComponent } from './openstreetmap.component';

describe('OpenstreetmapComponent', () => {
  let component: OpenstreetmapComponent;
  let fixture: ComponentFixture<OpenstreetmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenstreetmapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OpenstreetmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
