import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../intefaces/itask';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getListTask(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.apiUrl);
  }

  editTask(nhanVien: ITask): Observable<ITask> {
    return this.http.put<ITask>(`${this.apiUrl}/${nhanVien.id}`, nhanVien);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  createProject(project: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.apiUrl, project, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
