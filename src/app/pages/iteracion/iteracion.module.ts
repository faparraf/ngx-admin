import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { IteracionRoutingModule, routedComponents } from './iteracion-routing.module';
import { ClustService } from '../../@core/data/clust.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OrganizationService } from '../../@core/data/organization.service';
import { SeleccionInicioComponent } from './inicio/seleccion-inicio/seleccion-inicio.component';


@NgModule({
  imports: [
    NgxDatatableModule,
    ThemeModule,
    IteracionRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    SeleccionInicioComponent,
  ],
  providers: [
    ClustService,
    OrganizationService,
  ],
})

export class IteracionModule { }

