import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BemVindoPageComponent } from './bem-vindo-page.component';

describe('BemVindoPageComponent', () => {
  let component: BemVindoPageComponent;
  let fixture: ComponentFixture<BemVindoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BemVindoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BemVindoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
