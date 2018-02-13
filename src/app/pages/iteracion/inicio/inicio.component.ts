import { Component } from '@angular/core';
import { AwsTransformService } from '../../../@core/utils/awsTransform.service';
import { LocalDataSource } from 'ng2-smart-table';
import { AssetsService } from '../../../@core/data/assets.service';

@Component({
  selector: 'ngx-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})

export class InicioComponent {
  iniciarIter = 'Iniciar Iteración';
  data: any[];
  rows: any;
  settings: any;
  source: LocalDataSource;

  constructor(private assetsService: AssetsService) {
    this.data = [];
    this.settings = {
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
  }
  rowsSelectedData(event) {
    this.data = event;
    this.source = new LocalDataSource(event);
  }

  iniciarIteracion() {
    this.iniciarIter = 'Iniciando Iteraciones ...'
    const array = [];
    this.data.forEach(element => {
      array.push(element.id);
    });
    this.assetsService.initIteracion({ assets: array })
      .subscribe(res => {
        this.iniciarIter = 'Iniciar Iteración';
        this.data = [];
      });
  }

  columnsGlobalData(event) {
    if (event.Item.id !== undefined) {
      this.assetsService.getSettings(event.Item.id.S)
        .subscribe(res => {
          this.settings = {
            actions: {
              add: false,
              edit: false,
              delete: false,
            },
            columns: AwsTransformService.getColumnTable(res),
          };
        });
    }
  }
}
