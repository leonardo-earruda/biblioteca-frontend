import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorPageComponent } from './autor-page.component';

describe('AutorPageComponent', () => {
  let component: AutorPageComponent;
  let fixture: ComponentFixture<AutorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutorPageComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
