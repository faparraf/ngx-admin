import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClusterComponent } from './cluster.component';
import { AgrupamientoComponent } from './agrupamiento/agrupamiento.component';

const routes: Routes = [{
  path: '',
  component: ClusterComponent,
  children: [{
    path: 'agrupamiento',
    component: AgrupamientoComponent,
  },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ClusterRoutingModule { }

export const routedComponents = [
  AgrupamientoComponent,
  ClusterComponent,
];
