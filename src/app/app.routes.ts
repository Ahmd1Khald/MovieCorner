
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './pages/movie-details/movie-details';
import { Home } from './pages/home/home'; // أو أي كومبوننت رئيسي

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'details/:id', component: MovieDetailsComponent },
  { path: '**', redirectTo: '' } // fallback لأي رابط غير معروف
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
