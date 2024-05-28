import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IDuAn } from '../idu-an';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-duanlisk',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './duanlisk.component.html',
  styleUrls: ['./duanlisk.component.css'], // Sửa lại thành styleUrls
})
export class DuanliskComponent {
  list_du_an: IDuAn[] = [];
  editingProject: IDuAn | null = null;

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    fetch(`http://localhost:3000/projects`)
      .then((res) => res.json())
      .then((data) => {
        this.list_du_an = data;
      });
  }

  editProject(project: IDuAn): void {
    const confirmed = confirm(
      `Bạn có chắc chắn muốn sửa dự án ${project.ten_du_an}?`
    );
    if (confirmed) {
      this.editingProject = { ...project }; // Tạo một bản sao của project để chỉnh sửa
    }
  }

  updateProject(): void {
    if (this.editingProject) {
      fetch(`http://localhost:3000/projects/${this.editingProject.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.editingProject),
      })
        .then((res) => res.json())
        .then((updatedProject) => {
          const index = this.list_du_an.findIndex(
            (p) => p.id === updatedProject.id
          );
          if (index !== -1) {
            this.list_du_an[index] = updatedProject;
          }
          this.editingProject = null;
        })
        .catch((error) => {
          console.error('Lỗi khi cập nhật dự án:', error);
        });
    }
  }

  cancelEdit(): void {
    this.editingProject = null;
  }
  deleteProject(id: number): void {
    const confirmed = confirm(`Bạn có chắc chắn muốn xóa dự án có ID ${id}?`);
    if (confirmed) {
      fetch(`http://localhost:3000/projects/${id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            console.log(`Dự án với ID ${id} đã được xóa thành công.`);
            this.list_du_an = this.list_du_an.filter((p) => p.id !== id);
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
