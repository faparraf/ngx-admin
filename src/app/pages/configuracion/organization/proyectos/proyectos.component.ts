import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrganizationService } from '../../../../@core/data/organization.service';
import { AwsTransformService } from '../../../../@core/utils/awsTransform.service';

@Component({
  selector: 'ngx-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss'],
})
export class ProyectosComponent implements OnInit {

  public organizationTree: any[];
  @Input('projectLocal') projectLocal: any;
  @Output('getProject') getProject: EventEmitter<any> = new EventEmitter();
  @Output('listProject') listProject: any;
  @Output('listProjectAWS') listProjectAWS: any;
  public tree: any;

  public level(id: any) {
    const level = id.split('.');
    return level.length;
  }

  public getText(text: string, listOrg: any) {
    let texto = '';
    listOrg.forEach(element => {
      if (element.label === text) {
        texto = element.valor;
      }
    });
    return texto;
  }

  public asign(p: any) {
    this.projectLocal = p;
    this.getProject.emit(this.projectLocal);
  }

  constructor(private orgService: OrganizationService) {
    this.listProjectAWS = this.orgService.getTree();
    this.listProject = AwsTransformService.getJsonTree(this.listProjectAWS);
  }

  ngOnInit() {
  }

}
