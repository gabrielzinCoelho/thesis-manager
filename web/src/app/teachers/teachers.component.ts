import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Professor, Departamento } from '../services/api.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TeachersComponent implements OnInit {
  private api = inject(ApiService);
  professores: Professor[] = [];
  departamentos: Departamento[] = [];
  search = '';
  loading = false;

  ngOnInit() {
    this.api.getDepartamentos().subscribe(d => this.departamentos = d);
    this.load();
  }

  load() {
    this.loading = true;
    this.api.getProfessores(this.search).subscribe({
      next: data => { this.professores = data; this.loading = false; },
      error: () => this.loading = false,
    });
  }

  getDepNome(id: number): string {
    return this.departamentos.find(d => d.id === id)?.nome ?? '-';
  }
}
