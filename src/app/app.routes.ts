import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './pages/movie-details/movie-details';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { LoginComponent } from './pages/login/login';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },
  {
path: 'search',
  loadComponent: () => import('./pages/search/search').then(m => m.Search)
  },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'details/:id', component: MovieDetailsComponent },

  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/favorites/favorites').then((m) => m.Favorites),
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


