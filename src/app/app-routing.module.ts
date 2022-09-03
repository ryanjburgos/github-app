import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutesEnum } from './app-routes.enum';

const routes: Routes = [{ path: AppRoutesEnum.repos, loadChildren: () => import('./pages/repos/repos.module').then((m) => m.ReposModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
