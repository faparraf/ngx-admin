import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportesComponent } from './reportes.component';
import { GeneralComponent } from './general/general.component';

const routes: Routes = [{
  path: '',
  component: ReportesComponent,
  children: [{
    path: 'general',
    component: GeneralComponent,
  },
],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesRoutingModule { }

export const routedComponents = [
  GeneralComponent,
  ReportesComponent,
];

