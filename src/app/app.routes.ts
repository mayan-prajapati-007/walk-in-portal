import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

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
    },
    {
        path: 'register',
        pathMatch: 'full',
        component: RegisterComponent,
        title: 'Register Page'
    },
    {
        path: '**',
        redirectTo: ''
    }
];
