import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDuAn } from '../intefaces/idu-an';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/projects';

  constructor(private http: HttpClient) {}
  //duan
  getProjects(): Observable<IDuAn[]> {
    return this.http.get<IDuAn[]>(this.apiUrl);
  }

  updateProject(project: IDuAn): Observable<IDuAn> {
    return this.http.put<IDuAn>(`${this.apiUrl}/${project.id}`, project, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  createProject(project: IDuAn): Observable<IDuAn> {
    return this.http.post<IDuAn>(this.apiUrl, project, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
