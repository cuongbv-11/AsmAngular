import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ITask } from '../intefaces/itask';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-task-lisk',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-lisk.component.html',
  styleUrl: './task-lisk.component.css',
})
export class TaskLiskComponent {
  list_tasks: ITask[] = [];
  editTasks: ITask | null = null;
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchListTask();
  }

  fetchListTask(): void {
    this.taskService.getListTask().subscribe((data) => {
      this.list_tasks = data;
    });
  }

  editTask(project: ITask): void {
    const confirmed = confirm(
      `Bạn có chắc chắn muốn sửa nhân viên có ID ${project.id}?`
    );
    if (confirmed) {
      this.editTasks = { ...project }; // Tạo một bản sao của nhân viên để chỉnh sửa
    }
  }

  updateTask(): void {
    if (this.editTasks) {
      this.taskService.editTask(this.editTasks).subscribe(
        (updateTask) => {
          const index = this.list_tasks.findIndex(
            (p) => p.id === updateTask.id
          );
          if (index !== -1) {
            this.list_tasks[index] = updateTask;
          }
          this.editTasks = null;
        },
        (error) => {
          console.error('Lỗi khi cập nhật nhân viên:', error);
        }
      );
    }
  }

  cancelEdit(): void {
    this.editTasks = null;
  }

  deletetask(id: number): void {
    const confirmed = confirm(
      `Bạn có chắc chắn muốn xóa nhân viên có ID ${id}?`
    );
    if (confirmed) {
      this.taskService.deleteTask(id).subscribe(
        () => {
          console.log(`Nhân viên với ID ${id} đã được xóa thành công.`);
          this.list_tasks = this.list_tasks.filter((p) => p.id !== id);
        },
        (error) => {
          console.error(`Xóa nhân viên với ID ${id} thất bại.`);
        }
      );
    }
  }
}
