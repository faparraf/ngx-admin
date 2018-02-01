import { Component} from '@angular/core';
import { ClustService } from '../../../@core/data/clust.service';
import { AwsTransformService } from '../../../@core/utils/awsTransform.service';


const tree =    [{
  'id': {
  'S': 'af12',
  },
  'root': {
  'S': '1',
  },
  'name': {
  'S': 'uno',
  },
}, {
  'id': {
  'S': 'af12.af13',
  },
  'root': {
  'S': '1',
  },
  'name': {
  'S': 'unopuntouno',
  },
}, {
  'id': {
  'S': 'ab12',
  },
  'root': {
  'S': '1',
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

  public organizationTree: any;
  public org: any;

  public level(id: any) {
    const level = id.split('.');
    return level.length;
  }

  public editOrganization(org: any) {
    this.org = org;
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

  constructor(private service: ClustService) {
      // Read the result field from the JSON response.
      this.organizationTree = AwsTransformService.getJsonTree(tree);
  }
}
