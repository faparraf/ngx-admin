import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionComponent } from './configuracion.component';
import { AbstractformComponent } from './abstractform/abstractform.component';
import { OrganizationComponent } from './organization/organization.component';

const routes: Routes = [{
  path: '',
  component: ConfiguracionComponent,
  children: [{
    path: 'abstract-form',
    component: AbstractformComponent,
  }, {
    path: 'organization',
    component: OrganizationComponent,
  },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionRoutingModule {

}

export const routedComponents = [
  ConfiguracionComponent,
  AbstractformComponent,
  OrganizationComponent,
];
