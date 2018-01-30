import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivosComponent } from './activos.component';
import { CargarComponent } from './cargar/cargar.component';
import { GestionComponent } from './gestion/gestion.component';

const routes: Routes = [{
  path: '',
  component: ActivosComponent,
  children: [{
    path: 'cargar',
    component: CargarComponent,
  }, {
    path: 'gestion',
    component: GestionComponent,
  },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ActivosRoutingModule { }

export const routedComponents = [
  ActivosComponent,
  GestionComponent,
  CargarComponent,
];
