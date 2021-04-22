import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

// Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/login']);

// Automatically log in users
const redirectLoggedInToClient = () => redirectLoggedInTo(['/clients']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./Account/login/login.module').then(m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToClient),
  },
  {
    path: 'clients',
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./Client/client.module').then(m => m.ClientModule)
  },
  {
    path: 'tasks',
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./Task/task.module').then(m => m.TaskModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
