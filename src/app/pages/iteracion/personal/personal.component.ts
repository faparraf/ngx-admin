import { Component, ViewChild } from '@angular/core';
import { AssetsService } from '../../../@core/data/assets.service';
// import { AwsTransformService } from '../../../@core/utils/awsTransform.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';


@Component({
  selector: 'ngx-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  styles: [`
  nb-card {
    transform: translate3d(0, 0, 0);
  }
`],
})
export class PersonalComponent {
  allColumns: any;
  projectAWS: any;
  project: any;
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
    this.columns = [];
    this.selected = [];
  }
  cambiarEstado() {

  }

  getOrg(event): void {
    this.projectAWS = event;
    this.columns = [{ name: 'asset' }, { name: 'estado' }, { name: 'fecha' },
    { name: 'id' }, { name: 'organization' }, { name: 'usuario_responsable', prop: 'usuario_responsable' }];
    this.allColumns = [{ name: 'asset' }, { name: 'estado' }, { name: 'fecha' },
    { name: 'id' }, { name: 'organization' }, { name: 'usuario_responsable', prop: 'usuario_responsable' }];
    if (this.projectAWS.Item.id !== undefined) {
      this.assetsService.getAssets(this.projectAWS.Item.id.S)
        .subscribe(res => {
          // this.rows = AwsTransformService.getNormalArray(res);
          // this.temp = [...this.rows];
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
      return d.estado.toLowerCase().indexOf(val) !== -1 ||
        d.id.toLowerCase().indexOf(val) !== -1 ||
        d.fecha.toLowerCase().indexOf(val) !== -1 ||
        !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}
