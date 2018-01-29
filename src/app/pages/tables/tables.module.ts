import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { ClustService } from '../../@core/data/clust.service';
import { AbstractformComponent } from './abstractform/abstractform.component';
import { OrganizationComponent } from './organization/organization.component';

@NgModule({
  imports: [
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    AbstractformComponent,
    OrganizationComponent,
  ],
  providers: [
    ClustService,
  ],
})
export class TablesModule { }
