import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nv-them',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nv-them.component.html',
  styleUrl: './nv-them.component.css',
})
export class NvThemComponent {
  constructor(private http: HttpClient, private router: Router) {}
  onCreate(employees: any): void {
    let apiUrl = 'http://localhost:3000/employees';
    this.http.post(apiUrl, employees).subscribe((res) => {
      if (res) {
        alert('Them Nhan Vien Thanh cong');
        this.router.navigate(['/nhan_vien']);
      }
    });
  }
}
