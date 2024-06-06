import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { INhanVien } from '../intefaces/inhan-vien';
import { NhanVienService } from '../service/nhan-vien.service';

@Component({
  selector: 'app-nv-them',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nv-them.component.html',
  styleUrl: './nv-them.component.css',
})
export class NvThemComponent {
  constructor(
    private nhanvienService: NhanVienService,
    private router: Router
  ) {}

  onCreate(project: INhanVien): void {
    this.nhanvienService.createProject(project).subscribe((res) => {
      if (res) {
        alert('Them Nhan Vien Thanh cong');
        this.router.navigate(['/nhan_vien']);
      }
    });
  }
}
