import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, RouterModule, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { EventEmitter, Output } from '@angular/core';
import { MenuItem } from '../shared/menu-item.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [RouterModule, MatIconModule],
})
export class SidebarComponent implements OnInit {
  @Input() menuItems: MenuItem[] = [];
  @Input() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();
  currentPath: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentPath = this.router.url;

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentPath = this.router.url;
      });
  }

  isActive(item: MenuItem): boolean {
    if (item.activeRegex) {
      return new RegExp(item.activeRegex).test(this.currentPath);
    }
    return this.currentPath === item.link || this.currentPath === `/${item.link}`;
  }

  toggleSidebar(): void {
    this.collapsedChange.emit(!this.collapsed);
  }

  getSidebarClasses(): string {
    return this.collapsed
      ? 'fixed left-0 top-0 z-40 flex h-screen w-20 flex-col overflow-y-auto bg-slate-800 text-slate-100 shadow-lg transition-all duration-300 lg:w-20'
      : 'fixed left-0 top-0 z-40 flex h-screen w-full flex-col overflow-y-auto bg-slate-800 text-slate-100 shadow-lg transition-all duration-300 lg:w-64';
  }

  getHeaderClasses(): string {
    return this.collapsed
      ? 'flex items-center justify-center border-b border-slate-700 px-2 py-5'
      : 'flex items-center justify-between border-b border-slate-700 px-5 py-5';
  }

  getItemClasses(item: MenuItem): string {
    const activeClasses = this.isActive(item)
      ? 'bg-blue-600 border-l-blue-400 font-semibold'
      : 'border-transparent';

    return this.collapsed
      ? `flex items-center justify-center border-l-4 px-0 py-4 text-slate-100 no-underline transition-all duration-300 cursor-pointer hover:bg-slate-700 ${activeClasses}`
      : `flex items-center border-l-4 px-5 py-4 text-slate-100 no-underline transition-all duration-300 cursor-pointer hover:bg-slate-700 hover:pl-6 ${activeClasses}`;
  }
}
