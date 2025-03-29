import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PublicComponent } from './public.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule],
  declarations: [PublicComponent],
  exports: [PublicComponent],
})
export class PublicModule {}
