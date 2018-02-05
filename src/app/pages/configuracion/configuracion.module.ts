import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { ConfiguracionRoutingModule, routedComponents } from './configuracion-routing.module';
import { ClustService } from '../../@core/data/clust.service';
import { AwsTransformService } from '../../@core/utils/awsTransform.service';
import { OrganizationService } from '../../@core/data/organization.service';
import { ProyectosComponent } from './organization/proyectos/proyectos.component';


@NgModule({
  imports: [
    ThemeModule,
    ConfiguracionRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    ProyectosComponent,
  ],
  providers: [
    ClustService,
    AwsTransformService,
    OrganizationService,
  ],
  entryComponents: [
    ProyectosComponent,
  ],
})
export class ConfiguracionModule { }




