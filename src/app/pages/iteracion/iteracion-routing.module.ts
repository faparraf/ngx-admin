import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IteracionComponent } from './iteracion.component';
import { GeneralComponent } from './general/general.component';
import { InicioComponent } from './inicio/inicio.component';
import { PersonalComponent } from './personal/personal.component';

const routes: Routes = [{
  path: '',
  component: IteracionComponent,
  children: [{
    path: 'general',
    component: GeneralComponent,
  }, {
    path: 'inicio',
    component: InicioComponent,
  }, {
    path: 'personal',
    component: PersonalComponent,
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
  InicioComponent,
  PersonalComponent,
];
