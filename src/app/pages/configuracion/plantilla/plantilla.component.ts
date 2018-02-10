import { Component } from '@angular/core';
// import { OrganizationService } from '../../../@core/data/organization.service';
import { AwsTransformService } from '../../../@core/utils/awsTransform.service';
import { LocalDataSource } from 'ng2-smart-table';
import { OrganizationService } from '../../../@core/data/organization.service';


@Component({
  selector: 'ngx-plantilla',
  templateUrl: './plantilla.component.html',
  styleUrls: ['./plantilla.component.scss'],
})
export class PlantillaComponent {
  project: any;
  source: LocalDataSource;
  data: any;
  projectAWS: any;
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
    this.projectAWS = event;
    if (this.projectAWS.Item.info !== undefined) {
      this.data = AwsTransformService.getColumnTableArray(event.Item.fields.L);
      }
    this.source = new LocalDataSource(this.data);
  }

  constructor( private assetsService: AssetsService, private orgService: OrganizationService) {
    this.data = [];
  }

  guardarPlantilla(): void {
    this.projectAWS.Item.fields = AwsTransformService.getColumnTableArrayInverse(this.source).fields;
    this.orgService.put(this.projectAWS.Item)
      .subscribe(res => {
      });
  }
}
