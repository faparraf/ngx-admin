import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { IteracionRoutingModule, routedComponents } from './iteracion-routing.module';
import { ClustService } from '../../@core/data/clust.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    NgxDatatableModule,
    ThemeModule,
    IteracionRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ClustService,
  ],
})

export class IteracionModule { }

