import { Component} from '@angular/core';
import { ClustService } from '../../../@core/data/clust.service';
@Component({
  selector: 'ngx-app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent {

  getElement(label, item): any {
    let element,
    type;
    for (const i in item) {
      if (item.hasOwnProperty(i)) {
        type = i;
        element = item[i];
      }
    }
    return {
      valor:element,
      label:label,
      tipo:type,
    }
  }

  private getArray(item): any {
    const array = [];
    for (const i in item) {
      if (item.hasOwnProperty(i)) {
        array.push(this.getElement(i, item[i]));
      }
    }
    return array;
  }

  private getJsonTree(oldTree, newTree) {
    if (oldTree !== undefined) {
      for (let i = 0; i < oldTree.length; i++) {
        const description = this.getArray(oldTree[i].Item);
        newTree.push({Item:description});
        this.getJsonTree(oldTree[i].Item, newTree);
      }
    }else {
      return newTree;
    }
  }

  public organizationTree: any;
  public treeJson: any;

  constructor(private service: ClustService) {
    this.service.get('/organization/2').subscribe(data => {
      // Read the result field from the JSON response.
      this.treeJson = [];
      this.organizationTree = data;
      this.getJsonTree([data], this.treeJson);
    });
  }
}
