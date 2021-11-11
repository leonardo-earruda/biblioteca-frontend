import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarAutorComponent } from './criar-autor.component';


describe('CriarAutorComponent', () => {
  let component: CriarAutorComponent;
  let fixture: ComponentFixture<CriarAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriarAutorComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
