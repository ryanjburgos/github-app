import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../../ui/button/button.module';
import { InputModule } from '../../ui/form-builder/input/input.module';
import { TableModule } from '../../ui/table/table.module';

import { CommitsRoutingModule } from './commits-routing.module';
import { CommitsComponent } from './commits.component';

@NgModule({
  declarations: [CommitsComponent],
  imports: [CommonModule, CommitsRoutingModule, TableModule, ButtonModule, InputModule, ReactiveFormsModule],
})
export class CommitsModule {}
