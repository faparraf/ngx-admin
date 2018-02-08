import { Component } from '@angular/core';
import { AssetsService } from '../../../@core/data/assets.service';
import { AwsTransformService } from '../../../@core/utils/awsTransform.service';

@Component({
  selector: 'ngx-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss'],
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})

export class GestionComponent {
  data: any;
  column: any;
  settings: any;


  constructor(private assetsService: AssetsService) {
    this.data = [];
    this.settings = {
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
    };
    this.assetsService.getAssets(1)
      .subscribe(res => {
        this.data = AwsTransformService.getNormalArray(res);
      });
    this.assetsService.getSettings(1)
      .subscribe(res => {
        this.settings = {
          add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmCreate: true,
          },
          edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmSave: true,
          },
          delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
          },
          columns: AwsTransformService.getColumnTable(res),
        };
      });
  }

  onCreateConfirm(event): void {
    if (event.newData.serial !== '') {
      if (window.confirm('Seguro que desea crear el activo  Serial: ' + event.newData.serial)) {
        this.assetsService.addAsset(event.newData)
          .subscribe(res => {
            event.confirm.resolve();
          });
      } else {
        event.confirm.reject();
      }
    } else {
      alert('Serial no puede ser vacio');
    }
  }

  onEditConfirm(event): void {
    if (window.confirm('Seguro que desea editar el activo Modelo: ' +
      event.data.modelo + ' Serial: ' + event.data.serial)) {
      this.assetsService.EditAsset(event.newData)
        .subscribe(res => {
          event.confirm.resolve();
        });
    } else {
      event.confirm.reject();
    }
  }
}


