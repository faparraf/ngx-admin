import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: 'configuracion',
    loadChildren: './configuracion/configuracion.module#ConfiguracionModule',
  }, {
    path: 'activos',
    loadChildren: './activos/activos.module#ActivosModule',
  }, {
    path: 'cluster',
    loadChildren: './cluster/cluster.module#ClusterModule',
  }, {
    path: 'reportes',
    loadChildren: './reportes/reportes.module#ReportesModule',
  }, {
    path: 'iteracion',
    loadChildren: './iteracion/iteracion.module#IteracionModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
