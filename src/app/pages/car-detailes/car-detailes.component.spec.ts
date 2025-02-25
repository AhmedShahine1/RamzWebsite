import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailesComponent } from './car-detailes.component';

describe('CarDetailesComponent', () => {
  let component: CarDetailesComponent;
  let fixture: ComponentFixture<CarDetailesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDetailesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
