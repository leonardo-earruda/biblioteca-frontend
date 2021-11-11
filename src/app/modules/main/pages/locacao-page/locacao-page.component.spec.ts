import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocacaoPageComponent } from './locacao-page.component';

describe('LocacaoPageComponent', () => {
  let component: LocacaoPageComponent;
  let fixture: ComponentFixture<LocacaoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocacaoPageComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocacaoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
