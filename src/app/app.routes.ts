import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'user', component: UserComponent },
    { path: '**', component: PagenotfoundComponent }
];
