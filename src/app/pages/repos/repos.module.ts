import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TableModule } from '../../ui/table/table.module';
import { ReposRoutingModule } from './repos-routing.module';
import { ReposComponent } from './repos.component';

@NgModule({
  declarations: [ReposComponent],
  imports: [CommonModule, ReposRoutingModule, TableModule, RouterModule],
})
export class ReposModule {}
