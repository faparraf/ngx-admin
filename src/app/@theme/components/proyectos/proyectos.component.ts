import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrganizationService } from '../../../@core/data/organization.service';

@Component({
  selector: 'ngx-proyectos',
  template: `
  <nb-card>
    <nb-card-header>
        Proyectos
    </nb-card-header>
    <nb-card-body>
        <div *ngFor="let project of listProjectAWS">
            <div class="row identado{{level(project.id)}}">
                <div *ngIf="project === projectLocal " class="row activo" >
                    <a class="icon-container" (click)="asign(project)">
                        <span><i class="nb-play"></i> {{project.nombre}}
                        </span>
                    </a>
                </div>
                <div *ngIf="project !== projectLocal " class="row" >
                    <a class="icon-container" (click)="asign(project)" >
                        <span><i class="nb-play"></i> {{project.nombre}}
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </nb-card-body>
</nb-card>
  `,
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
