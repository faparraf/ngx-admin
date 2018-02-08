import { Component } from '@angular/core';

@Component({
  selector: 'ngx-plantilla',
  templateUrl: './plantilla.component.html',
  styleUrls: ['./plantilla.component.scss'],
})
export class PlantillaComponent {
  project: any;

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      field: {
        title: 'Nombre del Campo',
        type: 'string',
      },
      label: {
        title: 'Título del campo',
        type: 'string',
      },
    },
  };

  getOrg(event): void {
    this.project = event;
  }
  constructor() { }


}
