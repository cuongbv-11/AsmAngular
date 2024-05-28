import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { INhanVien } from '../inhan-vien';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nv-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nv-list.component.html',
  styleUrl: './nv-list.component.css',
})
export class NvListComponent {
  list_nhan_vien: INhanVien[] = [];
  editingProject: INhanVien | null = null;

  ngOnInit(): void {
    fetch(`http://localhost:3000/employees`)
      .then((res) => res.json())
      .then((data) => {
        this.list_nhan_vien = data;
      });
  }
  editNvien(project: INhanVien): void {
    const confirmed = confirm(`Bạn có chắc chắn muốn sửa dự án ${project.id}?`);
    if (confirmed) {
      this.editingProject = { ...project }; // Tạo một bản sao của project để chỉnh sửa
    }
  }

  updateProject(): void {
    if (this.editingProject) {
      fetch(`http://localhost:3000/employees/${this.editingProject.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.editingProject),
      })
        .then((res) => res.json())
        .then((updatedProject) => {
          const index = this.list_nhan_vien.findIndex(
            (p) => p.id === updatedProject.id
          );
          if (index !== -1) {
            this.list_nhan_vien[index] = updatedProject;
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
      fetch(`http://localhost:3000/employees/${id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            console.log(`Dự án với ID ${id} đã được xóa thành công.`);
            this.list_nhan_vien = this.list_nhan_vien.filter(
              (p) => p.id !== id
            );
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
