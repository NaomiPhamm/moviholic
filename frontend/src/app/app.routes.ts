import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Movies } from './components/movies/movies';
import { MovieDetail } from './components/movie-detail/movie-detail';
import { authGuard } from './guards/auth-guard';
import { Profile } from './components/profile/profile';

export const routes: Routes = [

  { path: 'login', component: Login },

  { path: 'register', component: Register },

  {
    path: 'movies',
    component: Movies,
    canActivate: [authGuard]
  },

  {
    path: 'movies/:id',
    component: MovieDetail,
    canActivate: [authGuard]
  },
  {
  path: 'profile',
  component: Profile,
  canActivate: [authGuard]
},

  { path: '', redirectTo: 'login', pathMatch: 'full' }

];