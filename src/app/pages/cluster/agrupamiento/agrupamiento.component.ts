import { Component } from '@angular/core';
import { AssetsService } from '../../../@core/data/assets.service';
import { AwsTransformService } from '../../../@core/utils/awsTransform.service';
import { ClustService } from '../../../@core/data/clust.service';

@Component({
  selector: 'ngx-agrupamiento',
  templateUrl: './agrupamiento.component.html',
  styleUrls: ['./agrupamiento.component.scss'],
})
export class AgrupamientoComponent {
  iteraciones: any;
  filtro1: any;
  filtro2: any;
  columns2: any;
  columns1: any;
  columnsIteracion: any;
  isCollapsed = true;
  org: any;
  settings: any;

  myform1 = {
    clase: 'col-9',
    alertas: false,
    campos: [{
      etiqueta: 'input',
      nombre: 'asset',
      label: 'Asset',
      placeholder: 'Ingrese id de asset',
      tipo: 'text',
    }, {
      etiqueta: 'input',
      nombre: 'id',
      label: 'Iteración',
      placeholder: 'Ingrese id de iteración',
      tipo: 'text',
    }, {
      etiqueta: 'input',
      nombre: 'estado',
      label: 'Estado',
      placeholder: 'Ingrese estado',
      tipo: 'text',
    }],
  };
  myform2 = {
    clase: 'col-9',
    alertas: false,
    campos: [],
  };
  constructor(private assetsService: AssetsService,
    private clustService: ClustService) {
    this.filtro1 = { data: {} };
    this.filtro2 = { data: {} };

  }

  getToFilter(items) {
    const array = []
      ; for (const i in items) {
        if (items.hasOwnProperty(i)) {
          if (items[i].S !== '') {
            const obj = {
              campo: i,
              funcion: 'eq',
              valor: items[i]
            }
            array.push(obj);
          }
        }
      }
    return (array);
  }

  getFiltro1(event) {
    this.filtro1 = event;
  }

  getFiltro2(event) {
    this.filtro2 = event;
  }

  filtrar() {
    this.filtro1.data.organization = this.org.Item.id.S;
    this.filtro2.data.organization = this.org.Item.id.S;

    const filtroFinal = {
      filtro_iteracion: [],
      filtro_asset: [],
    };
    filtroFinal.filtro_iteracion = this.getToFilter(this.filtro1.data);
    filtroFinal.filtro_asset = this.getToFilter(this.filtro2.data);
    this.clustService.getCompose(filtroFinal)
      .subscribe(res => {
        console.log(filtroFinal);
        const a = JSON.parse(JSON.stringify(res));
        this.iteraciones = JSON.parse(a);
        this.columnsIteracion = AwsTransformService.getColumnsNgxByData(this.iteraciones[0]);
        console.log(this.columnsIteracion);
      });
  }

  getOrg(event): void {
    this.org = event;
    if (this.org.Item.id !== undefined) {
      this.assetsService.getSettings(this.org.Item.id.S)
        .subscribe(res => {
          this.settings = res;
          this.columns1 = AwsTransformService.getColumnTableNgx(this.settings);
          this.columns2 = AwsTransformService.getColumnTable(this.settings),
            this.columns1.forEach(element => {
              const e = {
                etiqueta: 'input',
                nombre: element.prop,
                label: element.name,
                placeholder: 'Ingrese ' + element.name,
                tipo: 'text',
                clase: 'form-control',
                valor: '',
              }
              this.myform2.campos.push(e);
            });
        });
    }
  }
}

