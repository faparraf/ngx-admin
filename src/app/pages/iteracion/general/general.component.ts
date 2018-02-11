import { Component, ViewChild } from '@angular/core';
import { AssetsService } from '../../../@core/data/assets.service';
import { AwsTransformService } from '../../../@core/utils/awsTransform.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'ngx-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})

export class GeneralComponent {
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
    this.columns = [{ prop: 'field' }];
    this.selected = [];
    this.assetsService.getAssets(1)
      .subscribe(res => {
        this.rows = AwsTransformService.getNormalArray(res);
        this.temp = [...this.rows];
      });
    this.assetsService.getSettings(1)
      .subscribe(res => {
        this.orgAWS = res;
        this.columns = AwsTransformService.getNormalArrayProceso(this.orgAWS.Item.fields.L);
      });
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
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
