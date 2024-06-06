import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IDuAn } from '../intefaces/idu-an';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../service/product.service';

@Component({
  selector: 'app-duanlisk',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './duanlisk.component.html',
  styleUrls: ['./duanlisk.component.css'],
})
export class DuanliskComponent implements OnInit {
  list_du_an: IDuAn[] = [];
  editingProject: IDuAn | null = null;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.projectService
      .getProjects()
      .subscribe((data) => (this.list_du_an = data));
  }

  editProject(project: IDuAn): void {
    if (confirm(`Bạn có chắc chắn muốn sửa dự án ${project.ten_du_an}?`)) {
      this.editingProject = { ...project };
    }
  }

  updateProject(): void {
    if (this.editingProject) {
      this.projectService
        .updateProject(this.editingProject)
        .subscribe((updatedProject) => {
          const index = this.list_du_an.findIndex(
            (p) => p.id === updatedProject.id
          );
          if (index !== -1) this.list_du_an[index] = updatedProject;
          this.editingProject = null;
        });
    }
  }

  cancelEdit(): void {
    this.editingProject = null;
  }

  deleteProject(id: number): void {
    if (confirm(`Bạn có chắc chắn muốn xóa dự án có ID ${id}?`)) {
      this.projectService.deleteProject(id).subscribe(() => {
        this.list_du_an = this.list_du_an.filter((p) => p.id !== id);
      });
    }
  }
}
