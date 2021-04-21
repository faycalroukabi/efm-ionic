import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guard/auth.guard';
import {ReAuthGuard} from './guard/re-auth.guard';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard]},
    {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [ReAuthGuard]},
    {path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule', canActivate: [ReAuthGuard]},
    {path: 'list', loadChildren: './pages/list/list.module#ListPageModule'},
    {path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
    {path: 'chat-detail/:id', loadChildren: () => import('./pages/chat-detail/chat-detail.module').then(m => m.ChatDetailPageModule)},
    {path: 'user-profile', loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfilePageModule)},
    {path: 'settings', loadChildren: () => import('./tabs/settings/settings.module').then(m => m.SettingsPageModule)},
   { path: 'upload-picture', loadChildren: './pages/upload-picture/upload-picture.module#UploadPicturePageModule' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
