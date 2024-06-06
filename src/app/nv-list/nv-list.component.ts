import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { INhanVien } from '../intefaces/inhan-vien';
import { FormsModule } from '@angular/forms';
import { NhanVienService } from '../service/nhan-vien.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-nv-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nv-list.component.html',
  styleUrl: './nv-list.component.css',
})
export class NvListComponent implements OnInit {
  list_nhan_vien: INhanVien[] = [];
  editingProject: INhanVien | null = null;

  constructor(private nhanVienService: NhanVienService) {}

  ngOnInit(): void {
    this.fetchListNhanVien();
  }

  fetchListNhanVien(): void {
    this.nhanVienService.getListNhanVien().subscribe((data) => {
      this.list_nhan_vien = data;
    });
  }

  editNvien(nhanVien: INhanVien): void {
    const confirmed = confirm(
      `Bạn có chắc chắn muốn sửa nhân viên có ID ${nhanVien.id}?`
    );
    if (confirmed) {
      this.editingProject = { ...nhanVien }; // Tạo một bản sao của nhân viên để chỉnh sửa
    }
  }

  updateNhanVien(): void {
    if (this.editingProject) {
      this.nhanVienService.editNhanVien(this.editingProject).subscribe(
        (updatedNhanVien) => {
          const index = this.list_nhan_vien.findIndex(
            (p) => p.id === updatedNhanVien.id
          );
          if (index !== -1) {
            this.list_nhan_vien[index] = updatedNhanVien;
          }
          this.editingProject = null;
        },
        (error) => {
          console.error('Lỗi khi cập nhật nhân viên:', error);
        }
      );
    }
  }

  cancelEdit(): void {
    this.editingProject = null;
  }

  deleteNhanVien(id: number): void {
    const confirmed = confirm(
      `Bạn có chắc chắn muốn xóa nhân viên có ID ${id}?`
    );
    if (confirmed) {
      this.nhanVienService.deleteNhanVien(id).subscribe(
        () => {
          console.log(`Nhân viên với ID ${id} đã được xóa thành công.`);
          this.list_nhan_vien = this.list_nhan_vien.filter((p) => p.id !== id);
        },
        (error) => {
          console.error(`Xóa nhân viên với ID ${id} thất bại.`);
        }
      );
    }
  }
}
