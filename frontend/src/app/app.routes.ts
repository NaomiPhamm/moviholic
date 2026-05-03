import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Movies } from './components/movies/movies';
import { MovieDetail } from './components/movie-detail/movie-detail';
import { Profile } from './components/profile/profile';
import { AddMovie } from './components/add-movie/add-movie';
import { ReviewDetail } from './components/review-detail/review-detail';
import { authGuard } from './guards/auth-guard';
import { MovieEdit } from './components/movie-edit/movie-edit';

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

  {
    path: 'reviews/:id',  
    component: ReviewDetail,
    canActivate: [authGuard]
  },

  {
    path: 'add-movie',
    component: AddMovie,
    canActivate: [authGuard]
  },

  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  {
  path: 'movies/edit/:id',
  component: MovieEdit,
  canActivate: [authGuard]
}

];