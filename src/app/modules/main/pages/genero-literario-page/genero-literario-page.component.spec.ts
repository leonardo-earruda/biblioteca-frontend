import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroLiterarioPageComponent } from './genero-literario-page.component';

describe('GeneroLiterarioPageComponent', () => {
  let component: GeneroLiterarioPageComponent;
  let fixture: ComponentFixture<GeneroLiterarioPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneroLiterarioPageComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneroLiterarioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
