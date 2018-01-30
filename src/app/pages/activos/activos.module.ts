import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { ActivosRoutingModule, routedComponents } from './activos-routing.module';
import { ClustService } from '../../@core/data/clust.service';

@NgModule({
  imports: [
    ThemeModule,
    ActivosRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ClustService,
  ],
})

export class ActivosModule { }
