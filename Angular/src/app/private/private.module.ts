import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PrivateComponent } from './private.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule],
  declarations: [PrivateComponent],
  exports: [PrivateComponent],
})
export class PrivateModule {}
