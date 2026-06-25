import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, UnidadeAcademica } from '../services/api.service';

@Component({
  selector: 'app-academic-units',
  templateUrl: './academic-units.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AcademicUnitsComponent implements OnInit {
  private api = inject(ApiService);
  unidades: UnidadeAcademica[] = [];
  filtered: UnidadeAcademica[] = [];
  search = '';
  loading = false;

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getUnidades().subscribe({
      next: data => { this.unidades = data; this.filter(); this.loading = false; },
      error: () => this.loading = false,
    });
  }

  filter() {
    const s = this.search.toLowerCase();
    this.filtered = s ? this.unidades.filter(u => u.nome.toLowerCase().includes(s) || u.sigla.toLowerCase().includes(s)) : this.unidades;
  }
}
