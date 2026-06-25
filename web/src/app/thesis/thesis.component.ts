import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ApiService, TCC, Aluno, Professor } from '../services/api.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-thesis',
  templateUrl: './thesis.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
})
export class ThesisComponent implements OnInit {
  private api = inject(ApiService);

  tccs: TCC[] = [];
  alunos: Aluno[] = [];
  professores: Professor[] = [];
  search = '';
  loading = false;

  showModal = false;
  showStatusModal = false;
  editingTCC: TCC | null = null;

  selectedFile: File | null = null;

  form: Partial<TCC> = {};
  newStatus = '';

  statusChoices = [
    { value: '0', label: 'Em Elaboração' },
    { value: '1', label: 'Enviado' },
    { value: '2', label: 'Aprovado' },
    { value: '3', label: 'Reprovado' },
  ];

  tipoChoices = [
    { value: 'MONOGRAFIA', label: 'Monografia' },
    { value: 'RELATORIO_ESTAGIO', label: 'Relatório de Estágio' },
    { value: 'RELATORIO_TECNICO', label: 'Relatório Técnico' },
    { value: 'ARTIGO', label: 'Artigo' },
  ];

  idiomaChoices = [
    { value: 'PT', label: 'Português' },
    { value: 'EN', label: 'Inglês' },
  ];

  semestreChoices = ['2020/1','2020/2','2021/1','2021/2','2022/1','2022/2','2023/1','2023/2','2024/1','2024/2','2025/1','2025/2','2026/1'];

  ngOnInit() {
    this.api.getAlunos().subscribe(a => this.alunos = a);
    this.api.getProfessores().subscribe(p => this.professores = p);
    this.load();
  }

  load() {
    this.loading = true;
    this.api.getTCCs(this.search).subscribe({
      next: data => { this.tccs = data; this.loading = false; },
      error: () => this.loading = false,
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  getAlunoNome(id: number): string {
    return this.alunos.find(a => a.id === id)?.nome ?? '-';
  }

  getProfNome(id: number | null | undefined): string {
    if (!id) return '-';
    return this.professores.find(p => p.id === id)?.nome ?? '-';
  }

  getStatusLabel(status: string): string {
    return this.statusChoices.find(s => s.value === status)?.label ?? status;
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      '0': 'bg-yellow-100 text-yellow-800',
      '1': 'bg-blue-100 text-blue-800',
      '2': 'bg-green-100 text-green-800',
      '3': 'bg-red-100 text-red-800',
    };
    return map[status] ?? 'bg-slate-100 text-slate-700';
  }

  openCreate() {
  this.form = { status: '0', idioma: 'PT', tipo: 'MONOGRAFIA' };
  this.selectedFile = null;  
  this.showModal = true;
}

closeModal() {
  this.showModal = false;
  this.form = {};
  this.selectedFile = null;  
}
  save() {
  const fd = new FormData();

  const fields: (keyof typeof this.form)[] = [
    'titulo', 'resumo', 'palavras_chave', 'tipo', 'idioma',
    'aluno', 'orientador', 'presidente', 'primeiro_membro', 'segundo_membro',
    'status', 'semestre_letivo_defesa', 'coorientador',
  ];
  for (const key of fields) {
    const val = this.form[key];
    if (val !== undefined && val !== null && val !== '') {
      fd.append(key, String(val));
    }
  }

  if (this.selectedFile) {
    fd.append('arquivo', this.selectedFile, this.selectedFile.name);
  }

  this.api.createTCC(fd).subscribe({
    next: () => { this.closeModal(); this.load(); },
    error: (e) => alert('Erro ao salvar TCC: ' + JSON.stringify(e.error)),
  });
}

  openStatus(tcc: TCC) {
    this.editingTCC = tcc;
    this.newStatus = tcc.status;
    this.showStatusModal = true;
  }

  closeStatusModal() {
    this.showStatusModal = false;
    this.editingTCC = null;
  }

  saveStatus() {
    if (!this.editingTCC) return;
    this.api.updateTCC(this.editingTCC.id, { status: this.newStatus }).subscribe({
      next: () => { this.closeStatusModal(); this.load(); },
      error: (e) => alert('Erro ao atualizar status: ' + JSON.stringify(e.error)),
    });
  }

  getArquivoUrl(arquivo: string | null | undefined): string | null {
    if (!arquivo) return null;
    if (arquivo.startsWith('http')) return arquivo;
    return `${environment.apiUrl.replace('/api', '')}${arquivo}`;
  }
}
