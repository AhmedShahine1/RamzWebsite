import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSwipperComponent } from './main-swipper.component';

describe('MainSwipperComponent', () => {
  let component: MainSwipperComponent;
  let fixture: ComponentFixture<MainSwipperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSwipperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSwipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
