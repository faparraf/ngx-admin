import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { ActivosRoutingModule, routedComponents } from './activos-routing.module';
import { AssetsService } from '../../@core/data/assets.service';
import { OrganizationService } from '../../@core/data/organization.service';
import { AwsTransformService } from '../../@core/utils/awsTransform.service';


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
    AssetsService,
    OrganizationService,
    AwsTransformService,
  ],
})

export class ActivosModule { }
