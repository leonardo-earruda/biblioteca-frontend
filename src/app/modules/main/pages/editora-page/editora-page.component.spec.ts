import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditoraPageComponent } from './editora-page.component';

describe('EditoraPageComponent', () => {
  let component: EditoraPageComponent;
  let fixture: ComponentFixture<EditoraPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditoraPageComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditoraPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
