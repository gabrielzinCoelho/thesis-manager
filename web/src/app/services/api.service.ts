import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UnidadeAcademica {
  id: number;
  nome: string;
  sigla: string;
}

export interface Departamento {
  id: number;
  nome: string;
  sigla: string;
  unidade_academica: number;
}

export interface Curso {
  id: number;
  nome: string;
  sigla: string;
  codigo: string;
}

export interface Aluno {
  id: number;
  nome: string;
  matricula: string;
  curso: number;
}

export interface Professor {
  id: number;
  nome: string;
  departamento: number;
}

export interface TCC {
  id: number;
  titulo: string;
  resumo: string;
  palavras_chave: string;
  tipo: string;
  tipo_display?: string;
  idioma: string;
  idioma_display?: string;
  aluno: number;
  orientador: number;
  coorientador?: number | null;
  presidente: number;
  primeiro_membro: number;
  segundo_membro: number;
  semestre_letivo_defesa?: string;
  status: string;
  status_display?: string;
  arquivo?: string | null;
}

export interface Estatisticas {
  total_geral: number;
  por_status: Record<string, number>;
  por_tipo: Record<string, number>;
  por_idioma: Record<string, number>;
  por_semestre: Record<string, number>;
  por_orientador: Record<string, number>;
  por_coorientador: Record<string, number>;
  por_curso: Record<string, number>;
  por_departamento: Record<string, number>;
  por_unidade_academica: Record<string, number>;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  // Unidades Acadêmicas
  getUnidades(): Observable<UnidadeAcademica[]> {
    return this.http.get<UnidadeAcademica[]>(`${this.base}/unidades-academicas/`);
  }

  // Departamentos
  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.base}/departamentos/`);
  }

  // Cursos
  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.base}/cursos/`);
  }

  // Alunos
  getAlunos(search?: string): Observable<Aluno[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<Aluno[]>(`${this.base}/alunos/`, { params });
  }

  // Professores
  getProfessores(search?: string): Observable<Professor[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<Professor[]>(`${this.base}/professores/`, { params });
  }

  // TCCs
  getTCCs(search?: string): Observable<TCC[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<TCC[]>(`${this.base}/tccs/`, { params });
  }

  getTCC(id: number): Observable<TCC> {
    return this.http.get<TCC>(`${this.base}/tccs/${id}/`);
  }

  createTCC(data: FormData | Partial<TCC>): Observable<TCC> {
    return this.http.post<TCC>(`${this.base}/tccs/`, data);
  }

  updateTCC(id: number, data: Partial<TCC>): Observable<TCC> {
    return this.http.patch<TCC>(`${this.base}/tccs/${id}/`, data);
  }

  getEstatisticas(): Observable<Estatisticas> {
    return this.http.get<Estatisticas>(`${this.base}/tccs/estatisticas/`);
  }
}
