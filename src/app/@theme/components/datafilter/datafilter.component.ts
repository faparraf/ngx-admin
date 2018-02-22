import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'ngx-datafilter',
  templateUrl: './datafilter.component.html',
  styleUrls: ['./datafilter.component.scss']
})
export class DatafilterComponent implements OnInit {
  iteracionRows: any;
  selected: any;
  @Input('temp') temp: any;
  public isCollapsed = true;
  @Input('columns') columns: any;
  @Input('filterColumns') filterColumns: any;
  @Input('rows') rows: any;
  @Output('selectedData') selectedData: EventEmitter<any> = new EventEmitter();
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor() {
    this.rows = [];
    this.selected = [];
    this.iteracionRows = [];
   }

  ngOnInit() {
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
    this.selectedData.emit(this.iteracionRows);
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
