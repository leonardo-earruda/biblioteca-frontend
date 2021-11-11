import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirLivroLocacaoComponent } from './inserir-livro-locacao.component';

describe('InserirLivroLocacaoComponent', () => {
  let component: InserirLivroLocacaoComponent;
  let fixture: ComponentFixture<InserirLivroLocacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InserirLivroLocacaoComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirLivroLocacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
