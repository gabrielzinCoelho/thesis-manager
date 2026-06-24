import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';
import { CoursesComponent } from './courses/courses.component';
import { DepartmentsComponent } from './departments/departments.component';
import { AcademicUnitsComponent } from './academic-units/academic-units.component';
import { ThesisComponent } from './thesis/thesis.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'academic-units', component: AcademicUnitsComponent },
  { path: 'thesis', component: ThesisComponent }
];
