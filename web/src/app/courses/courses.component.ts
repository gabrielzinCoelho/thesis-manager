import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Curso } from '../services/api.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CoursesComponent implements OnInit {
  private api = inject(ApiService);
  cursos: Curso[] = [];
  filtered: Curso[] = [];
  search = '';
  loading = false;

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getCursos().subscribe({
      next: data => { this.cursos = data; this.filter(); this.loading = false; },
      error: () => this.loading = false,
    });
  }

  filter() {
    const s = this.search.toLowerCase();
    this.filtered = s ? this.cursos.filter(c => c.nome.toLowerCase().includes(s) || c.sigla.toLowerCase().includes(s) || c.codigo.toLowerCase().includes(s)) : this.cursos;
  }
}
