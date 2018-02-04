import { Component} from '@angular/core';
import { AwsTransformService } from '../../../@core/utils/awsTransform.service';
import { UUID } from 'angular2-uuid';


const tree =    [{
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
  public attrib: any[];
  public organizationTree: any;
  public org: any;

  public find (array, item) {
    let i = -1, count = 0;
    array.forEach(element => {
      count ++;
      if (element === item) {
        i = count;
      }
    });
    return i;
  };

  public findId (array, item) {
    let i = -1, count = 0;
    array.forEach(element => {
      count ++;
      if (element.id === item.id) {
        i = count;
      }
    });
    return i;
  };

  public deleteAtrrib(atrib)  {
    const i: any = this.find(this.attrib, atrib);
    this.attrib.splice(i - 1, 1);
    tree.splice(i - 1, 1);
  }

  public level(id: any) {
    const level = id.split('.');
    return level.length;
  }

  public editOrganization(org: any) {
    this.org = org;
    AwsTransformService.getElementAws(org);
  }
  public addAttrib() {
    if (this.org !== undefined) {
      this.attrib.push({
        valor:'Nuevo atributo',
        label:'Nombre atributo',
        tipo :'S',
      })
    }else {
      alert('Debe seleccione un proyecto');
    }
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
    const i: any = this.find(this.organizationTree, org);
    const newProject = {
      id : {
       S : tree[ i - 1].id.S + '.' + UUID.UUID(),
      },
      name: {
       S : 'Nuevo Proyecto',
      },
    };
    this.organizationTree.splice(i, 0, AwsTransformService.getArray(newProject));
    tree.splice(i, 0, newProject);
  }

  public deleteOrganization(org: any) {
    const i: any = this.find(this.organizationTree, org);
    this.organizationTree.splice(i - 1, 1);
    tree.splice(i - 1, 1);
  }

  public addOrganizationEnd() {
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

  public saveAttribs() {
    const i = this.findId(this.organizationTree, this.org);

    this.org = this.org.concat(this.attrib);
    this.organizationTree.splice(i - 1, 1);
    this.organizationTree.splice(i - 1, 0, this.org);
    tree.splice(i - 1, 1);
    tree.splice(i - 1, 0, AwsTransformService.getElementAws(this.org));
    this.attrib = [];
  }
  constructor() {
      // Read the result field from the JSON response.
      this.organizationTree = AwsTransformService.getJsonTree(tree);
      this.attrib = [];
  }
}
