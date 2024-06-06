import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ITask } from '../intefaces/itask';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-task-them',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-them.component.html',
  styleUrl: './task-them.component.css',
})
export class TaskThemComponent {
  constructor(private taskService: TaskService, private router: Router) {}

  onCreate(project: ITask): void {
    this.taskService.createProject(project).subscribe((res) => {
      if (res) {
        alert('Them task Thanh cong');
        this.router.navigate(['/task']);
      }
    });
  }
}
