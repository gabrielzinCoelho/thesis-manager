import { Component, OnInit, OnDestroy, inject, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Estatisticas } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class DashboardComponent implements OnInit {
  private api = inject(ApiService);

  stats: Estatisticas | null = null;
  loading = true;
  error = false;

  ngOnInit() {
    this.api.getEstatisticas().subscribe({
      next: data => { this.stats = data; this.loading = false; },
      error: () => { this.error = true; this.loading = false; },
    });
  }

  toEntries(obj: Record<string, number> | undefined): { key: string; value: number }[] {
    if (!obj) return [];
    return Object.entries(obj).map(([key, value]) => ({ key: key ?? 'N/A', value })).sort((a, b) => b.value - a.value);
  }

  maxValue(entries: { key: string; value: number }[]): number {
    return Math.max(...entries.map(e => e.value), 1);
  }

  barWidth(value: number, max: number): string {
    return `${Math.round((value / max) * 100)}%`;
  }

  statusColor(key: string): string {
    const map: Record<string, string> = {
      'Em Elaboração': '#f59e0b',
      'Enviado': '#3b82f6',
      'Aprovado': '#22c55e',
      'Reprovado': '#ef4444',
    };
    return map[key] ?? '#6366f1';
  }

  chartColors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6', '#f97316', '#ec4899'];

  getColor(index: number): string {
    return this.chartColors[index % this.chartColors.length];
  }
}
