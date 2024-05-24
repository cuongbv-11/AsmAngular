import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskLiskComponent } from './task-lisk.component';

describe('TaskLiskComponent', () => {
  let component: TaskLiskComponent;
  let fixture: ComponentFixture<TaskLiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskLiskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskLiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
