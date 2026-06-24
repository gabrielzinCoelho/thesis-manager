import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { MenuItem } from '../shared/menu-item.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
})
export class LayoutComponent {
  menuItems: MenuItem[] = [
    { title: 'Dashboard', icon: 'dashboard', link: '/dashboard' },
    { title: 'Alunos', icon: 'school', link: '/students' },
    { title: 'Professores', icon: 'groups', link: '/teachers' },
    { title: 'Cursos', icon: 'menu_book', link: '/courses' },
    { title: 'Departamentos', icon: 'account_balance', link: '/departments' },
    { title: 'Unidades Acadêmicas', icon: 'apartment', link: '/academic-units' },
    { title: 'TCCs', icon: 'description', link: '/thesis' },
  ];
}
