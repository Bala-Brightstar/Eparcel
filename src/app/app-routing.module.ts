import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {path: '', canActivate: [AuthGuard], redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', canActivate: [AuthGuard] , loadChildren: () => {
    return import('./modules/dashboard/dashboard-meta-routers/dashboard-meta-routers.module')
    .then(module => module.DashboardMetaRoutersModule);
  } },
  {path: 'grs/login', component: AuthComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
