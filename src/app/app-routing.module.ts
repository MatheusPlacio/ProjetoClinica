import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth-guards.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: SidebarComponent,  // Usa SidebarComponent como layout
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',  // Se não houver rota, redireciona para dashboard
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'clientes',
        component: ClientesComponent,
      }
    ]
  },
  {
    path: 'sidebar',
    redirectTo: 'dashboard',  // Redireciona de /sidebar para /dashboard
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
