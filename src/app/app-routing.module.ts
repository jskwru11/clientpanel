import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)},
  {path: 'register', loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule)},
  {path: 'settings', loadChildren: () => import('./components/settings/settings.module').then(m => m.SettingsModule), canLoad: [AuthGuard]},
  {path: 'client/add', loadChildren: () => import('./components/add-client/add-client.module').then(m => m.AddClientModule), canLoad: [AuthGuard]},
  {path: 'client/edit/:id', loadChildren: () => import('./components/edit-client/edit-client.module').then(m => m.EditClientModule)},
  {path: 'client/:id', loadChildren: () => import('./components/client-details/client-details.module').then(m => m.ClientDetailsModule), canLoad: [AuthGuard]},
  {path: '**', loadChildren: () => import('./components/not-found/not-found.module').then(m => m.NotFoundModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AuthGuard ]
})
export class AppRoutingModule { }
