import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IteracionComponent } from './iteracion.component';
import { GeneralComponent } from './general/general.component';

const routes: Routes = [{
  path: '',
  component: IteracionComponent,
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

export class IteracionRoutingModule { }

export const routedComponents = [
  IteracionComponent,
  GeneralComponent,
];