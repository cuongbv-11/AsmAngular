import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DuanliskComponent } from './duanlisk/duanlisk.component';
import { DuanThemComponent } from './duan-them/duan-them.component';
import { NvListComponent } from './nv-list/nv-list.component';
import { NvThemComponent } from './nv-them/nv-them.component';
import { TaskLiskComponent } from './task-lisk/task-lisk.component';
import { TaskThemComponent } from './task-them/task-them.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Trang Chu' },
  { path: 'du_an', component: DuanliskComponent, title: 'Danh Sach du an' },
  { path: 'du_an/them', component: DuanThemComponent, title: 'Them du an' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'nhan_vien',
    component: NvListComponent,
    title: 'Danh Sach nhan vien',
  },
  {
    path: 'nhan_vien/them',
    component: NvThemComponent,
    title: 'Them nhan vien',
  },

  {
    path: 'task',
    component: TaskLiskComponent,
    title: 'danh sach task',
  },
  {
    path: 'task/them',
    component: TaskThemComponent,
    title: 'Them task',
  },

  {
    path: '**',
    component: NotFoundComponent,
    title: 'khong tim thay',
  },
];
