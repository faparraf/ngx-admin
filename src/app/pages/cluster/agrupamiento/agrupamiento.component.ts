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
  columnasSelect: any[];
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
      claseGrid: 'col-4',
      requerido: false,
      etiqueta: 'input',
      nombre: 'asset',
      label: 'Asset',
      placeholder: 'Ingrese id de asset',
      tipo: 'text',
    }, {
      claseGrid: 'col-4',
      requerido: false,
      etiqueta: 'input',
      nombre: 'id',
      label: 'Iteración',
      placeholder: 'Ingrese id de iteración',
      tipo: 'text',
    }, {
      claseGrid: 'col-4',
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
  myformclust: any;

  constructor(private assetsService: AssetsService,
    private clustService: ClustService) {
    this.filtro1 = { data: {} };
    this.filtro2 = { data: {} };
    this.clusterData = [];
    this.myformclust = {
      tipo_formulario: 'basic',
      titulo: 'Clusterización',
      btn: 'Clusterizar' + ' (' + this.clusterData.length + ')',
      alertas: true,
      campos: [],
    };
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
    console.info(JSON.stringify(filtroFinal));
    this.clustService.getCompose(filtroFinal)
      .subscribe(res => {
        // console.log(filtroFinal);
        const a = JSON.parse(JSON.stringify(res));
        this.iteraciones = JSON.parse(a);
        this.columnsIteracion = AwsTransformService.getColumnsNgxByData(this.iteraciones[0]);
        let i = 0;
        this.columnasSelect = [];
        this.columnasSelect.push({ id: i, valor: 'Seleccione el parámetro ...' });
        this.columnsIteracion.forEach(element => {
          i++;
          this.columnasSelect.push({ id: i, valor: element.name });
        });
      });
  }
  construirForm() {
    this.myformclust.campos = [{
      claseGrid: 'col-3',
      clase: 'form-control',
      etiqueta: 'select',
      nombre: 'parametro1',
      label: '* Seleccione parametro 1',
      requerido: true,
      valor: { id: 0 },
      opciones: this.columnasSelect,
    }, {
      claseGrid: 'col-3',
      clase: 'form-control',
      etiqueta: 'select',
      nombre: 'parametro2',
      label: '* Seleccione parametro 2',
      requerido: true,
      valor: { id: 0 },
      opciones: this.columnasSelect,
    }, {
      claseGrid: 'col-3',
      clase: 'form-control',
      etiqueta: 'select',
      nombre: 'metodo',
      label: '* Seleccione parametro 2',
      requerido: true,
      valor: { id: 0 },
      opciones: [
        { id: 0, valor: 'Seleccione el algoritmo' },
        { id: 1, valor: 'equal_k-means' },
      ],
    }, {
      claseGrid: 'col-3',
      clase: 'form-control',
      etiqueta: 'input',
      nombre: 'numero_clusters',
      label: 'Número de clusters',
      placeholder: 'Cantidad de clusters',
      requerido: true,
      tipo: 'number',
      minimo: 1,
    }];
  }

  clusterizar(event) {
    console.info(event);
    const assets = [];
    this.clusterData.forEach(element => {
      assets.push(element.asset);
    });
    const body = {
      metodo: (this.myformclust.campos[2].opciones[event.data.metodo.id]).valor,
      assets: assets,
      atributos: [this.columnasSelect[event.data.parametro1.id].valor,
                  this.columnasSelect[event.data.parametro2.id].valor],
      numero_clusters: parseInt(event.data.numero_clusters, 10),
      organization: this.org.Item.id.S,
    };
    console.info(body);
    this.clustService.clusterizar(body)
      .subscribe(res => {
        console.info(res);
      });
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
    this.construirForm();
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
                claseGrid: 'col-3',
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

