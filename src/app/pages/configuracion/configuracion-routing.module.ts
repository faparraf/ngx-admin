import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionComponent } from './configuracion.component';
import { AbstractformComponent } from './abstractform/abstractform.component';
import { OrganizationComponent } from './organization/organization.component';
import { ProcesoComponent } from './proceso/proceso.component';
import { PlantillaComponent } from './plantilla/plantilla.component';

const routes: Routes = [{
  path: '',
  component: ConfiguracionComponent,
  children: [{
    path: 'abstract-form',
    component: AbstractformComponent,
  }, {
    path: 'organization',
    component: OrganizationComponent,
  }, {
    path: 'proceso',
    component: ProcesoComponent,
  }, {
    path: 'plantilla',
    component: PlantillaComponent,
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
  ProcesoComponent,
  PlantillaComponent,
];
