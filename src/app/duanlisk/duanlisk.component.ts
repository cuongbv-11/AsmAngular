import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IDuAn } from '../idu-an';

@Component({
  selector: 'app-duanlisk',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './duanlisk.component.html',
  styleUrl: './duanlisk.component.css',
})
export class DuanliskComponent {
  list_du_an: IDuAn[] = [];
  ngOnInit(): void {
    fetch(`http://localhost:3000/du_an`)
      .then((res) => res.json())
      .then((data) => {
        this.list_du_an = data;
      });
  }
}
