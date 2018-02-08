import { Component } from '@angular/core';
// import { OrganizationService } from '../../../@core/data/organization.service';
import { AwsTransformService } from '../../../@core/utils/awsTransform.service';
import { AssetsService } from '../../../@core/data/assets.service';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'ngx-plantilla',
  templateUrl: './plantilla.component.html',
  styleUrls: ['./plantilla.component.scss'],
})
export class PlantillaComponent {
  project: any;
  source: LocalDataSource;
  data: any;
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

  constructor( private assetsService: AssetsService) {
    this.data = [];
    this.assetsService.getSettings(1)
      .subscribe(res => {
        this.data = AwsTransformService.getColumnTableArray(res);
        this.source = new LocalDataSource(this.data);
        // console.log(this.data);
      });
  }

  guardarPlantilla(): void {
    // console.log(this.source);
    AwsTransformService.getColumnTableArrayInverse(this.source);
  }
}
