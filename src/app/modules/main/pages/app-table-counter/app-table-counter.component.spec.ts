import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTableCounterComponent } from './app-table-counter.component';

describe('AppTableCounterComponent', () => {
  let component: AppTableCounterComponent;
  let fixture: ComponentFixture<AppTableCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppTableCounterComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTableCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
