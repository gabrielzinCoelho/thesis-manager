import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MenuItem } from '../shared/menu-item.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class SidebarComponent implements OnInit {
  @Input() menuItems: MenuItem[] = [];
  currentPath: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.currentPath = this.router.url;
    });
  }

  isActive(item: MenuItem): boolean {
    if (item.activeRegex) {
      return new RegExp(item.activeRegex).test(this.currentPath);
    }
    return this.currentPath === item.link || this.currentPath === `/${item.link}`;
  }
}
