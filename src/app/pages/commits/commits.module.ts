import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from '../../ui/table/table.module';

import { CommitsRoutingModule } from './commits-routing.module';
import { CommitsComponent } from './commits.component';

@NgModule({
  declarations: [CommitsComponent],
  imports: [CommonModule, CommitsRoutingModule, TableModule],
})
export class CommitsModule {}
