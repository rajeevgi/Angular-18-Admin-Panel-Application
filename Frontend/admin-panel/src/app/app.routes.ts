import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AddAdminComponent } from './pages/add-admin/add-admin.component';
import { AdminUpdateComponent } from './pages/admin-update/admin-update.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { UserDataComponent } from './pages/user-data/user-data.component';

export const routes: Routes = [
  // default route
  {
    path: '',
    redirectTo: 'app-login',
    pathMatch: 'full',
  },

  {
    path: 'app-register',
    component: RegisterComponent,
  },

  {
    path: 'app-login',
    component: LoginComponent,
  },

  {
    path:'',
    component: LayoutComponent,
    children: [
      {
        path: 'app-admin-dashboard',
        component: AdminDashboardComponent
      },

      {
        path: 'app-dashboard',
        component: DashboardComponent,
      },

      {
        path: 'app-add-admin',
        component:AddAdminComponent
      },

      {
        path: 'app-users',
        component: UsersComponent,
      },

      {
        path: 'app-admin-update/:id',
        component: AdminUpdateComponent
      },

      {
        path: 'app-update-user/:id',
        component: UpdateUserComponent,
      },

      {
        path: 'app-user-data/:id',
        component: UserDataComponent
      }
    ],
  },

  {
    path: 'app-navbar',
    component: NavbarComponent
  },

  {
    path: 'app-footer',
    component: FooterComponent
  },

  {
    path: '**',
    redirectTo: 'app-login',
  },
];
