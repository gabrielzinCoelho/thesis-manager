import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Departamento, UnidadeAcademica } from '../services/api.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class DepartmentsComponent implements OnInit {
  private api = inject(ApiService);
  departamentos: Departamento[] = [];
  filtered: Departamento[] = [];
  unidades: UnidadeAcademica[] = [];
  search = '';
  loading = false;

  ngOnInit() {
    this.api.getUnidades().subscribe(u => this.unidades = u);
    this.load();
  }

  load() {
    this.loading = true;
    this.api.getDepartamentos().subscribe({
      next: data => { this.departamentos = data; this.filter(); this.loading = false; },
      error: () => this.loading = false,
    });
  }

  filter() {
    const s = this.search.toLowerCase();
    this.filtered = s ? this.departamentos.filter(d => d.nome.toLowerCase().includes(s) || d.sigla.toLowerCase().includes(s)) : this.departamentos;
  }

  getUnidadeNome(id: number): string {
    return this.unidades.find(u => u.id === id)?.nome ?? '-';
  }
}
