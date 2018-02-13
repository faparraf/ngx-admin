import { Component, ViewChild,  Output, EventEmitter } from '@angular/core';
import { AssetsService } from '../../../../@core/data/assets.service';
import { AwsTransformService } from '../../../../@core/utils/awsTransform.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'ngx-seleccion-inicio',
  templateUrl: './seleccion-inicio.component.html',
  styleUrls: ['./seleccion-inicio.component.scss'],
})

export class SeleccionInicioComponent {
  @Output('rowsSelected') rowsSelected: EventEmitter<any> = new EventEmitter();
  @Output('columnsGlobal') columnsGlobal: EventEmitter<any> = new EventEmitter();
  columnsIteracion: any;
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
  iteracionRows: any;
  public isCollapsed = true;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private assetsService: AssetsService) {
    this.rows = [];
    this.selected = [];
    this.iteracionRows = [];
  }

  public findId(array, item) {
    const ids = [];
    let count = 0;
    array.forEach(element => {
      count++;
      if (element.id === item.id) {
        ids.push(count);
      }
    });
    return ids;
  };

  public deleteFromRows(item: any) {
    const ids: any = this.findId(this.rows, item);
    ids.forEach(i => {
      this.rows.splice(i - 1, 1);
      this.rows = [...this.rows];
      this.temp.splice(i - 1, 1);
      this.temp = [...this.temp];
    });
  }

  seleccionAIterar(): void {
    const temp = this.selected.slice();
    temp.forEach(element => {
      this.deleteFromRows(element);
    });
    this.iteracionRows.push(...temp);
    this.iteracionRows = [...this.iteracionRows];
    this.selected = [];
    this.rowsSelected.emit(this.iteracionRows);
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
          this.columnsIteracion = AwsTransformService.getColumnTableNgx(this.orgAWS);
          this.allColumns = AwsTransformService.getColumnTableNgx(this.orgAWS);
          this.columnsGlobal.emit(event);
        });
    }
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  toggle(col) {
    const isChecked = this.isChecked(col);

    if (isChecked) {
      this.columns = this.columns.filter(c => {
        return c.prop !== col.prop;
      });
    } else {
      this.columns = [...this.columns, col];
    }
  }

  isChecked(col) {
    return this.columns.find(c => {
      return c.prop === col.prop;
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
        d.seccional.toLowerCase().indexOf(val) !== -1 ||
        !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
