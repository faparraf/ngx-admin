import { Component} from '@angular/core';
import { ClustService } from '../../../@core/data/clust.service';
import { AwsTransformService } from '../../../@core/utils/awsTransform.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../ui-features/modals/modal/modal.component';
import { UUID } from 'angular2-uuid';


let tree =    [{
  'id': {
  'S': 'af12',
  },
  'name': {
  'S': 'uno',
  },
}, {
  'id': {
  'S': 'af12.af13',
  },
  'name': {
  'S': 'unopuntouno',
  },
}, {
  'id': {
  'S': 'ab12',
  },
  'name': {
  'S': 'dos',
  },
}];

@Component({
  selector: 'ngx-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})

export class OrganizationComponent {
  public edit = false;
  public organizationTree: any;
  public org: any;

  public level(id: any) {
    const level = id.split('.');
    return level.length;
  }

  public editOrganization(org: any) {
    this.org = org;
    AwsTransformService.getElementAws(org);
  }

  public getText(text: string, listOrg: any) {
    let texto = '';
    listOrg.forEach(element => {
      if ( element.label === text) {
        texto = element.valor;
      }
    });
    return texto;
  }

  public addOrganization(org: any) {
    let i = -1, count = 0;
    this.organizationTree.forEach(element => {
      count ++;
      if (element === org) {
        i = count;
      }
    });
    const newProject = {
      id : {
       S : tree[i - 1].id.S + '.' + UUID.UUID(),
      },
      name: {
       S : 'Nuevo Proyecto',
      },
    };
    this.organizationTree.splice(i, 0, AwsTransformService.getArray(newProject));
    tree.splice(i, 0, newProject);
  }

  public deleteOrganization(org: any) {
    let i = -1, count = 0;
    this.organizationTree.forEach(element => {
      count ++;
      if (element === org) {
        i = count;
      }
    });
    this.organizationTree.splice(i - 1, 1);
    tree.splice(i - 1, 1);
  }

  public addOrganizationEnd(org: any) {
    const newProject = {
      id : {
       S : UUID.UUID(),
      },
      name: {
       S : 'Nuevo Proyecto',
      },
    };
    this.organizationTree.push(AwsTransformService.getArray(newProject));
    tree.push(newProject);
  }

  public editAtrib(atrib) {
  }
  constructor(private service: ClustService, private modalService: NgbModal) {
      // Read the result field from the JSON response.
      this.organizationTree = AwsTransformService.getJsonTree(tree);
  }
}
