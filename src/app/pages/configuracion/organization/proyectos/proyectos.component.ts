import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrganizationService } from '../../../../@core/data/organization.service';

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

  public asign(p: any) {
    this.projectLocal = p;
    this.orgService.get(p.id)
    .subscribe(res => {
      this.getProject.emit(res);
    });
  }

  constructor(private orgService: OrganizationService) {
    this.orgService.getTree()
    .subscribe(res => {
      this.listProjectAWS = res;
    });
  }

  ngOnInit() {
  }

}
