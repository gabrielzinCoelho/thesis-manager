import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { MenuItem } from '../shared/menu-item.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule],
})
export class LayoutComponent {
  isSidebarOpen = signal(false);

  menuItems: MenuItem[] = [
    { title: 'Dashboard', icon: '📊', link: '/dashboard' },
    { title: 'Alunos', icon: '👨‍🎓', link: '/students' },
    { title: 'Professores', icon: '👨‍🏫', link: '/teachers' },
    { title: 'Cursos', icon: '📚', link: '/courses' },
    { title: 'Departamentos', icon: '🏢', link: '/departments' },
    { title: 'Unidades Acadêmicas', icon: '🏛️', link: '/academic-units' },
    { title: 'TCCs', icon: '📖', link: '/thesis' },
  ];

  toggleSidebar(): void {
    this.isSidebarOpen.update(value => !value);
  }

  closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }
}
