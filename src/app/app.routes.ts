import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
        title: 'Login Page'
    }
];
