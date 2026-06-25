import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ApiService, Aluno, Curso } from '../services/api.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
})
export class StudentsComponent implements OnInit {
  private api = inject(ApiService);

  alunos: Aluno[] = [];
  cursos: Curso[] = [];
  search = '';
  loading = false;

  ngOnInit() {
    this.api.getCursos().subscribe(c => this.cursos = c);
    this.load();
  }

  load() {
    this.loading = true;
    this.api.getAlunos(this.search).subscribe({
      next: data => { this.alunos = data; this.loading = false; },
      error: () => this.loading = false,
    });
  }

  getCursoNome(id: number): string {
    return this.cursos.find(c => c.id === id)?.nome ?? '-';
  }
}
