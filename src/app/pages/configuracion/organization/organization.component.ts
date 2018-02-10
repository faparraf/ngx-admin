import { Component } from '@angular/core';
import { AwsTransformService } from '../../../@core/utils/awsTransform.service';
import { UUID } from 'angular2-uuid';
import { OrganizationService } from '../../../@core/data/organization.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})

export class OrganizationComponent {
  public attrib: any[];
  public organizationTree: any;
  public org: any;
  public tree: any;
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
      key: {
        title: 'Nombre del Campo',
        type: 'string',
      },
      value: {
        title: 'Título del campo',
        type: 'string',
      },
    },
  };

  public find(array, item) {
    let i = -1, count = 0;
    array.forEach(element => {
      count++;
      if (element === item) {
        i = count;
      }
    });
    return i;
  };

  public findId(array, item) {
    let i = -1, count = 0;
    array.forEach(element => {
      count++;
      if (element.id === item.id) {
        i = count;
      }
    });
    return i;
  };

  public addOrganization(org: any) {
    const i: any = this.find(this.organizationTree, org);
    const newProject = {
      id: {
        S: this.tree[i - 1].id.S + '.' + UUID.UUID(),
      },
      name: {
        S: 'Nuevo Proyecto',
      },
    };
    this.organizationTree.splice(i, 0, AwsTransformService.getArray(newProject));
    this.tree.splice(i, 0, newProject);
  }

  public deleteOrganization(org: any) {
    const i: any = this.find(this.organizationTree, org);
    this.organizationTree.splice(i - 1, 1);
    this.tree.splice(i - 1, 1);
  }

  public addOrganizationEnd() {
    const newProject = {
      id: {
        S: UUID.UUID(),
      },
      name: {
        S: 'Nuevo Proyecto',
      },
    };
    this.organizationTree.push(AwsTransformService.getArray(newProject));
    this.tree.push(newProject);
  }

  getOrg(event): void {
    this.projectAWS = event;
    if (this.projectAWS.Item.info !== undefined) {
      this.data = AwsTransformService.getColumnTableArray(event.Item.info.L);
    }
    this.source = new LocalDataSource(this.data);
  }

  public guardarInfo() {
    const data = AwsTransformService.getColumnTableArrayInverse(this.source);
    this.projectAWS.Item.info = data.fields;
    this.orgService.put(this.projectAWS.Item)
      .subscribe(res => {
      });
  }

  constructor(private orgService: OrganizationService) {
    this.data = [];
  }
}



