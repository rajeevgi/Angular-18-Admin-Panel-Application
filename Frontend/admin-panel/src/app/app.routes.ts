import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
  // default route
  {
    path: '',
    redirectTo: 'app-login',
    pathMatch: 'full',
  },

  {
    path: 'app-login',
    component: LoginComponent,
  },

  {
    path: 'app-register',
    component: RegisterComponent,
  },

  // Routes for the layout component
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'app-dashboard',
        component: DashboardComponent,
      },

      {
        path: 'app-users',
        component: UsersComponent,
      },

      {
        path: 'app-update-user/:id',
        component: UpdateUserComponent,
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'app-login',
  },
];
