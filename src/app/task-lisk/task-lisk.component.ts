import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ITask } from '../itask';

@Component({
  selector: 'app-task-lisk',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-lisk.component.html',
  styleUrl: './task-lisk.component.css',
})
export class TaskLiskComponent {
  list_task: ITask[] = [];
  ngOnInit(): void {
    fetch(`http://localhost:3000/task`)
      .then((res) => res.json())
      .then((data) => {
        this.list_task = data;
      });
  }
}
