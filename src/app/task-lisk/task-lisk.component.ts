import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ITask } from '../itask';
import { FormsModule } from '@angular/forms';

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
  ngOnInit(): void {
    fetch(`http://localhost:3000/tasks`)
      .then((res) => res.json())
      .then((data) => {
        this.list_tasks = data;
      });
  }
  editNvien(project: ITask): void {
    const confirmed = confirm(`Bạn có chắc chắn muốn sửa dự án ${project.id}?`);
    if (confirmed) {
      this.editTasks = { ...project }; // Tạo một bản sao của project để chỉnh sửa
    }
  }

  updateProject(): void {
    if (this.editTasks) {
      fetch(`http://localhost:3000/tasks/${this.editTasks.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.editTasks),
      })
        .then((res) => res.json())
        .then((updatedProject) => {
          const index = this.list_tasks.findIndex(
            (p) => p.id === updatedProject.id
          );
          if (index !== -1) {
            this.list_tasks[index] = updatedProject;
          }
          this.editTasks = null;
        })
        .catch((error) => {
          console.error('Lỗi khi cập nhật dự án:', error);
        });
    }
  }

  cancelEdit(): void {
    this.editTasks = null;
  }
  deleteProject(id: number): void {
    const confirmed = confirm(`Bạn có chắc chắn muốn xóa dự án có ID ${id}?`);
    if (confirmed) {
      fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            console.log(`Dự án với ID ${id} đã được xóa thành công.`);
            this.list_tasks = this.list_tasks.filter((p) => p.id !== id);
          } else {
            console.error(`Xóa dự án với ID ${id} thất bại.`);
          }
        })
        .catch((error) => {
          console.error('Lỗi khi xóa dự án:', error);
        });
    }
  }
}
