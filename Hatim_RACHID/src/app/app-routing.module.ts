import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';



const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/login']);

// Automatically log in users
const redirectLoggedInToChat = () => redirectLoggedInTo(['/']);




const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
   
  },
  {
    path: '',
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./modals/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./modals/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'images',
    loadChildren: () => import('./pages/images/images.module').then( m => m.ImagesPageModule)
  },
  {
    path: 'image-viewer',
    loadChildren: () => import('./modals/image-viewer/image-viewer.module').then( m => m.ImageViewerPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }