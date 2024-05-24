import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuanliskComponent } from './duanlisk.component';

describe('DuanliskComponent', () => {
  let component: DuanliskComponent;
  let fixture: ComponentFixture<DuanliskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuanliskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DuanliskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
