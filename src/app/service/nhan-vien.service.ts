import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INhanVien } from '../intefaces/inhan-vien';

@Injectable({
  providedIn: 'root',
})
export class NhanVienService {
  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  getListNhanVien(): Observable<INhanVien[]> {
    return this.http.get<INhanVien[]>(this.apiUrl);
  }

  editNhanVien(nhanVien: INhanVien): Observable<INhanVien> {
    return this.http.put<INhanVien>(`${this.apiUrl}/${nhanVien.id}`, nhanVien);
  }

  deleteNhanVien(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  createProject(project: INhanVien): Observable<INhanVien> {
    return this.http.post<INhanVien>(this.apiUrl, project, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
