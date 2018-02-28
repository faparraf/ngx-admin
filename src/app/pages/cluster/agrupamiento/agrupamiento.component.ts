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
  segundoParametro: any;
  primerParametro: any;
  iniciarClust = 'Iniciar Clusterización'
  settingsCluster = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    pager: {
      perPage: 7,
    },
    columns: {},
  }
  clusterData: any;

  myform1 = {
    tipo_formulario: 'basic',
    titulo: 'Filtro Iteración',
    alertas: false,
    modelo: 'filtro1',
    campos: [{
      claseGrid : 'col-4',
      requerido: false,
      etiqueta: 'input',
      nombre: 'asset',
      label: 'Asset',
      placeholder: 'Ingrese id de asset',
      tipo: 'text',
    }, {
      claseGrid : 'col-4',
      requerido: false,
      etiqueta: 'input',
      nombre: 'id',
      label: 'Iteración',
      placeholder: 'Ingrese id de iteración',
      tipo: 'text',
    }, {
      claseGrid : 'col-4',
      requerido: false,
      etiqueta: 'input',
      nombre: 'estado',
      label: 'Estado',
      placeholder: 'Ingrese estado',
      tipo: 'text',
    }],
  };
  myform2 = {
    tipo_formulario: 'basic',
    titulo: 'Filtro de Assets',
    alertas: false,
    campos: [],
  };
  constructor(private assetsService: AssetsService,
    private clustService: ClustService) {
    this.filtro1 = { data: {} };
    this.filtro2 = { data: {} };
    this.clusterData = [];

  }

  getToFilter(items) {
    const array = []
      ; for (const i in items) {
        if (items.hasOwnProperty(i)) {
          if (items[i].S !== '') {
            const obj = {
              campo: i,
              funcion: 'eq',
              valor: items[i],
            }
            array.push(obj);
          }
        }
      }
    return (array);
  }

  getFiltro1(event) {
    this.filtro1 = event;
    console.info(this.filtro1);
  }

  getFiltro2(event) {
    this.filtro2 = event;
    console.info(this.filtro2);

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
    console.info(filtroFinal);
    this.clustService.getCompose(filtroFinal)
      .subscribe(res => {
        // console.log(filtroFinal);
        const a = JSON.parse(JSON.stringify(res));
        this.iteraciones = JSON.parse(a);
        this.columnsIteracion = AwsTransformService.getColumnsNgxByData(this.iteraciones[0]);
        // console.log(this.columnsIteracion);
      });
  }

  clusterizar() {
    // console.log('primer', this.primerParametro);
    // console.log('segundo', this.segundoParametro);
    this.iniciarClust = 'Clusterizando ...'
  }

  getDataFilter(event) {
    this.clusterData = [...event];
    this.settingsCluster = {
      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      pager: {
        perPage: 7,
      },
      columns: AwsTransformService.getColumnsSmartByData(this.clusterData[0]),
    }
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
                claseGrid : 'col-3',
                requerido: false,
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

