import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

// Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/']);

// Automatically log in users
const redirectLoggedInToFilm = () => redirectLoggedInTo(['/film']);


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToFilm),
  },
  {
    path: 'film',
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('src/app/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
