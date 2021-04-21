import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
// Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/']);

// Automatically log in users
const redirectLoggedInToChat = () => redirectLoggedInTo(['/chat']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToChat),
  },
  {
    path: 'chat',
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'registration',
    
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'Histoire',
    loadChildren: () => import('./histoire/histoire.module').then( m => m.HistoirePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
