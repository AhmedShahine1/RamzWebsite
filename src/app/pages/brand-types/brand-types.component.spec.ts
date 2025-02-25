import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandTypesComponent } from './brand-types.component';

describe('BrandTypesComponent', () => {
  let component: BrandTypesComponent;
  let fixture: ComponentFixture<BrandTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
