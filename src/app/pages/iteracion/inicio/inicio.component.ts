import { Component, ViewChild } from '@angular/core';
import { AssetsService } from '../../../@core/data/assets.service';
import { AwsTransformService } from '../../../@core/utils/awsTransform.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'ngx-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent {
  iniciarIter = 'Iniciar Iteración';
  allColumns: any;
  projectAWS: any;
  rows: any;
  column: any;
  settings: any;
  columns: any;
  selected: any;
  orgAWS: any;
  temp: any;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private assetsService: AssetsService) {
    this.rows = [];
    this.columns = [{ prop: 'name' }];
    this.selected = [];
  }

  getOrg(event): void {
    this.projectAWS = event;
    if (this.projectAWS.Item.id !== undefined) {
      this.assetsService.getAssets(this.projectAWS.Item.id.S)
        .subscribe(res => {
          this.rows = AwsTransformService.getNormalArray(res);
          this.temp = [...this.rows];
        });
      this.assetsService.getSettings(this.projectAWS.Item.id.S)
        .subscribe(res => {
          this.orgAWS = res;
          this.columns = AwsTransformService.getColumnTableNgx(this.orgAWS);
          this.allColumns = AwsTransformService.getColumnTableNgx(this.orgAWS);
        });
    }
  }

  iniciarIteracion() {
    this.iniciarIter = 'Iniciando Iteraciones ...'
    const array = [];
    this.selected.forEach(element => {
      array.push(element.id);
    });
    this.assetsService.initIteracion({ assets: array })
      .subscribe(res => {
        this.iniciarIter = 'Iniciar Iteración';
      });
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  toggle(col) {
    const isChecked = this.isChecked(col);

    if (isChecked) {
      this.columns = this.columns.filter(c => {
        return c.name !== col.name;
      });
    } else {
      this.columns = [...this.columns, col];
    }
  }

  isChecked(col) {
    return this.columns.find(c => {
      return c.name === col.name;
    });
  }

  onActivate(event) {
  }

  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [this.rows[1], this.rows[3]];
  }

  remove() {
    this.selected = [];
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.serial.toLowerCase().indexOf(val) !== -1 ||
        d.ciudad.toLowerCase().indexOf(val) !== -1 ||
        d.direccion.toLowerCase().indexOf(val) !== -1 ||
        !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}
