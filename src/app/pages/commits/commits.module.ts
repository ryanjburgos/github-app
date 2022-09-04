import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '../../ui/button/button.module';
import { TableModule } from '../../ui/table/table.module';

import { CommitsRoutingModule } from './commits-routing.module';
import { CommitsComponent } from './commits.component';

@NgModule({
  declarations: [CommitsComponent],
  imports: [CommonModule, CommitsRoutingModule, TableModule, ButtonModule],
})
export class CommitsModule {}
