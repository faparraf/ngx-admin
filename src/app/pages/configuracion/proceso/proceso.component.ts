import { Component, OnInit } from '@angular/core';
import * as Vis from 'vis';
import { UUID } from 'angular2-uuid';
import { AwsTransformService } from '../../../@core/utils/awsTransform.service';
import { OrganizationService } from '../../../@core/data/organization.service';
import { ProcesoService } from '../../../@core/data/proceso.service';


@Component({
  selector: 'ngx-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.scss'],
})
export class ProcesoComponent implements OnInit {
  public project: any;
  public proceso: any;
  public projectAWS: any;
  public nodes: any[];
  public edges: any[];
  public network: Vis.Network;
  public estado: any;
  public descripcion: any;
  public desde = { options: '' };
  public hasta = { options: '' };
  public procesos: any;

  existEdge(from, to) {
    let exist = false;
    this.edges.forEach(element => {
      if (element.from === from && element.to === to) {
        exist = true;
      }
    });
    return exist;
  }

  existNode(node) {
    let exist = false;
    this.nodes.forEach(element => {
      if (element.label === node.label) {
        exist = true;
      }
    });
    return exist;
  }

  constructor(private orgService: OrganizationService,
    private procesoService: ProcesoService) {
    this.estado = '';
    this.descripcion = '';
  }

  generateNode(label, tag, description) {
    const node = {
      id: UUID.UUID(),
      label: label,
      tag: tag,
      descripcion: description,
    };
    let inserted = false;
    if (!this.existNode(node)) {
      this.nodes.push(node);
      inserted = true;
    }
    return inserted;
  }

  addInitNodes() {
    this.generateNode('Inicio', 'start', 'Inicio del proceso');
    this.generateNode('Fin', 'end', 'Fin del proceso');
    this.draw();
  }

  addNode() {
    if (this.projectAWS === undefined) {
      alert('Seleccione un proyecto');
    } else {
      if (this.estado === '' || this.descripcion === '') {
        alert('Complete la información del estado');
      } else {
        if (this.generateNode(this.estado, 'process', this.descripcion)) {
          this.draw();
          this.estado = '';
          this.descripcion = '';
        } else {
          alert('Ya existe un estado con este nombre');
        }
      }
    }
  }

  addEdge() {
    if (this.projectAWS === undefined) {
      alert('Seleccione un proyecto');
    } else {
      if (this.desde.options !== '') {
        if (this.hasta.options !== '') {
          if (!this.existEdge(this.desde.options, this.hasta.options)) {
            this.edges.push({
              from: this.desde.options,
              to: this.hasta.options,
            });
          } else {
            alert('Ya existe esta arista');
          }
          this.draw();
          this.desde.options = '';
          this.hasta.options = '';
        } else {
          alert('Seleccione estado de destino');
        }
      } else {
        alert('Seleccione estado de origen');
      }
    }
  }

  getOrg(event): void {
    this.projectAWS = event;
    if (this.projectAWS.Item.process !== undefined) {
      this.nodes = AwsTransformService.getNormalArrayProceso(this.projectAWS.Item.process.M.nodes.L);
      this.edges = AwsTransformService.getNormalArrayProceso(this.projectAWS.Item.process.M.edges.L);
      this.draw();
    }
  }

  ngOnInit() {
    this.clear();
    this.procesoService.getProcesos()
      .subscribe(res => {
        console.info(res);
      })
  };

  clear() {
    this.nodes = [];
    this.edges = [];
    this.addInitNodes();
    this.draw();
  };

  save() {
    this.projectAWS.Item.process = {
      M: {
        nodes: { L: AwsTransformService.getIverseArray(this.nodes) },
        edges: { L: AwsTransformService.getIverseArray(this.edges) },
      },
    };
    this.orgService.put(this.projectAWS.Item)
      .subscribe(res => {
      });
  };

  draw() {
    const nodesDS = new Vis.DataSet(this.nodes);
    // create an array with edges
    const edgesDS = new Vis.DataSet(this.edges);
    // create a network
    const container = document.getElementById('mynetwork');
    const data = {
      nodes: nodesDS,
      edges: edgesDS,
    };
    const options = {
      nodes: {
        color: '#14ffbe',
        borderWidth: 3,
        borderWidthSelected: 1,
        font: {
          size: 15,
        },
        shape: 'dot',
      },
      edges: {
        arrows: {
          to: {
            enabled: true,
          },
        },
        smooth: false,
      },
      physics: false,
      interaction: {
        dragNodes: true,
        dragView: true,
        hideEdgesOnDrag: false,
        hideNodesOnDrag: false,
        hover: true,
        hoverConnectedEdges: true,
        keyboard: {
          enabled: false,
          speed: { x: 10, y: 10, zoom: 0.02 },
          bindToWindow: true,
        },
        multiselect: false,
        navigationButtons: true,
        selectable: true,
        selectConnectedEdges: true,
        tooltipDelay: 300,
        zoomView: true,
      },
      layout: {
        randomSeed: 1,
        improvedLayout: true,
        hierarchical: {
          enabled: true,
          levelSeparation: 300,
          nodeSpacing: 150,
          treeSpacing: 100,
          blockShifting: false,
          edgeMinimization: true,
          parentCentralization: true,
          direction: 'LR', // UD, DU, LR, RL
          sortMethod: 'directed', // hubsize, directed
        },
      },
    };
    this.network = new Vis.Network(container, data, options);
  };
}
