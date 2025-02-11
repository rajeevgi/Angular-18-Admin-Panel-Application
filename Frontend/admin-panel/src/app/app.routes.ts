import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';

export const routes: Routes = [
    // default route
    {
        path: '',
        redirectTo: 'app-dashboard',
        pathMatch: 'full'
    },

    {
        path: 'app-dashboard',
        component: DashboardComponent
    },

    {
        path: 'app-users',
        component: UsersComponent
    },

    {
        path: 'app-update-user/:id',
        component: UpdateUserComponent
    }

];
