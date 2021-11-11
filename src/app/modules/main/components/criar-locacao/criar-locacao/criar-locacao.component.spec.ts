import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarLocacaoComponent } from './criar-locacao.component';

describe('CriarLocacaoComponent', () => {
  let component: CriarLocacaoComponent;
  let fixture: ComponentFixture<CriarLocacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriarLocacaoComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarLocacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
