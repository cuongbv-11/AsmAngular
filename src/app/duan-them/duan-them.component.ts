import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-duan-them',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './duan-them.component.html',
  styleUrl: './duan-them.component.css',
})
export class DuanThemComponent {
  constructor(private http: HttpClient, private router: Router) {}
  onCreate(project: any): void {
    let apiUrl = 'http://localhost:3000/projects';
    this.http.post(apiUrl, project).subscribe((res) => {
      if (res) {
        alert('them moi thanh cong');
        this.router.navigate(['du_an']);
      }
    });
  }
}
