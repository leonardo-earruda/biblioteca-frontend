import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarGeneroLiterarioComponent } from './criar-genero-literario.component';

describe('CriarGeneroLiterarioComponent', () => {
  let component: CriarGeneroLiterarioComponent;
  let fixture: ComponentFixture<CriarGeneroLiterarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriarGeneroLiterarioComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarGeneroLiterarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
