import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { ConfiguracionRoutingModule, routedComponents } from './configuracion-routing.module';
import { ClustService } from '../../@core/data/clust.service';
import { AwsTransformService } from '../../@core/utils/awsTransform.service';
import { ModalComponent } from '../ui-features/modals/modal/modal.component';

@NgModule({
  imports: [
    ThemeModule,
    ConfiguracionRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    ModalComponent,
  ],
  providers: [
    ClustService,
    AwsTransformService,
  ],
  entryComponents: [
    ModalComponent,
  ],
})
export class ConfiguracionModule { }




