import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutesEnum } from './app-routes.enum';

const routes: Routes = [
  { path: '', redirectTo: AppRoutesEnum.repos, pathMatch: 'full' },
  { path: AppRoutesEnum.repos, loadChildren: () => import('./pages/repos/repos.module').then((m) => m.ReposModule) },
  { path: AppRoutesEnum.commits, loadChildren: () => import('./pages/commits/commits.module').then((m) => m.CommitsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
