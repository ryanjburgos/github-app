import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '../../ui/button/button.module';
import { InputModule } from '../../ui/form-builder/input/input.module';

import { TableModule } from '../../ui/table/table.module';
import { ReposRoutingModule } from './repos-routing.module';
import { ReposComponent } from './repos.component';

@NgModule({
  declarations: [ReposComponent],
  imports: [CommonModule, ReposRoutingModule, TableModule, RouterModule, InputModule, ReactiveFormsModule, ButtonModule],
})
export class ReposModule {}
