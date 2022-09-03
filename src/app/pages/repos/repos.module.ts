import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReposRoutingModule } from './repos-routing.module';
import { ReposComponent } from './repos.component';
import { TableModule } from '../../ui/table/table.module';

@NgModule({
  declarations: [ReposComponent],
  imports: [CommonModule, ReposRoutingModule, TableModule],
})
export class ReposModule {}
