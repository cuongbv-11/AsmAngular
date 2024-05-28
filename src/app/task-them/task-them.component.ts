import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-them',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-them.component.html',
  styleUrl: './task-them.component.css',
})
export class TaskThemComponent {
  constructor(private http: HttpClient, private router: Router) {}
  onCreate(tasks: any): void {
    let apiUrl = 'http://localhost:3000/tasks';
    this.http.post(apiUrl, tasks).subscribe((res) => {
      if (res) {
        alert('Them task Thanh cong');
        this.router.navigate(['/task']);
      }
    });
  }
}
