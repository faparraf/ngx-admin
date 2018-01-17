import { Component} from '@angular/core';


@Component({
  selector: 'ngx-app-abstractform',
  templateUrl: './abstractform.component.html',
  styleUrls: ['./abstractform.component.scss'],
})
export class AbstractformComponent {

  datos = [];
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
      confirmEdit: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      nombre: {
        title: 'Nombre',
        type: 'string',
      },
      label: {
        title: 'Label',
        type: 'string',
      },
      placeholder: {
        title: 'Placeholder',
        type: 'string',
      },
      requerido:{
        title: 'Requerido',
        type: 'string',
      },
      tipo: {
        title: 'Tipo',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [
              { value: 'text', title: 'Texto' },
              { value: 'area', title: 'Texto Largo' },
              { value: 'date', title: 'Fecha' },
              { value: 'check', title: 'Check' },
              { value: 'email', title: 'Email' },
              { value: 'range', title: 'Rango' },
              { value: 'number', title: 'Número' },
            ],
          },
        },
      },
    },
  };


  constructor() {
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      const pos = this.datos.indexOf(event.data);
      this.datos.splice(pos, 1);
    } else {
      event.confirm.reject();
    }
  }

}
