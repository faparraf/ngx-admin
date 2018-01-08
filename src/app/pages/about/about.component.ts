import { Component, OnInit } from '@angular/core';

// Component about
@Component({
  selector: 'ngx-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  formulario: any;

  constructor() {
    this.formulario = [
      { label: 'Label1',
        tipo: 'string',
        valor: 'Hola a todos',
      }, {
        label: 'Label2',
        tipo: 'string',
        valor: 'Fabio es gay',
      }, {
        label: 'Label3',
        tipo: 'fecha',
        valor: '2018-01-05',
      }, {
        label: 'Label4',
        tipo: 'bool',
        valor: false,
      },
    ];
  }
}
