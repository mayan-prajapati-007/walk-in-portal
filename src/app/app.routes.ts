import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WalkInListingComponent } from './walk-in-listing/walk-in-listing.component';
import { WalkInDetailsComponent } from './walk-in-details/walk-in-details.component';
import { WalkInSuccessComponent } from './walk-in-success/walk-in-success.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: WalkInListingComponent,
        title: 'Walk In Listing'
    },
    {
        path: 'walk-in-details/:id',
        pathMatch: 'full',
        component: WalkInDetailsComponent,
        title: 'Walk In Details'
    },
    {
        path: 'walk-in-details/success/:id',
        pathMatch: 'full',
        component: WalkInSuccessComponent,
        title: 'Walk In Success'
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
