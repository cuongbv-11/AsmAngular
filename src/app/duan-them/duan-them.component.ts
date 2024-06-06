import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../service/product.service';
import { IDuAn } from '../intefaces/idu-an';

@Component({
  selector: 'app-duan-them',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './duan-them.component.html',
  styleUrl: './duan-them.component.css',
})
export class DuanThemComponent {
  constructor(private projectService: ProjectService, private router: Router) {}

  onCreate(project: IDuAn): void {
    this.projectService.createProject(project).subscribe((res) => {
      if (res) {
        alert('Thêm mới thành công');
        this.router.navigate(['du_an']);
      }
    });
  }
}
