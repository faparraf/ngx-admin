import { Component, OnInit } from '@angular/core';
import * as Vis from 'vis';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'ngx-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.scss'],
})
export class ProcesoComponent implements OnInit {

  public nodes: any[];
  public edges: any[];
  public network: Vis.Network;
  public estado: any;
  public desde = { options: '' };
  public hasta = { options: '' };

  existEdge(from, to) {
    let exist = false;
    this.edges.forEach(element => {
      if (element.from === from && element.to) {
        exist = true;
      }
    });
    return exist;
  }

  constructor() {
  }

  addNode() {
    if (this.estado !== '') {
      this.nodes.push({
        id : UUID.UUID(),
        label: this.estado,
      });
      this.draw();
      this.estado = '';
    }
  }

  addEdge() {
    if (this.desde.options !== '') {
      if (this.hasta.options !== '') {
        if (!this.existEdge(this.desde.options, this.hasta.options)) {
          this.edges.push({
            from : this.desde.options,
            to: this.hasta.options,
          });
        }else {
          alert('Ya existe esta arista');
        }
        this.draw();
        this.desde.options = '';
        this.hasta.options = '';
      }else {
        alert('Seleccione estado de destino');
      }
    }else {
      alert('Seleccione estado de origen');
    }
  }

  ngOnInit() {
    this.nodes = [];
    this.edges = [];
    this.draw();
  };

  draw() {
    const nodesDS = new Vis.DataSet(this.nodes);
    // create an array with edges
    const edgesDS = new Vis.DataSet(this.edges);
    // create a network
    const container = document.getElementById('mynetwork');
    const data = {
      nodes : nodesDS,
      edges : edgesDS,
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
      interaction:{
        dragNodes:true,
        dragView: true,
        hideEdgesOnDrag: false,
        hideNodesOnDrag: false,
        hover: true,
        hoverConnectedEdges: true,
        keyboard: {
          enabled: false,
          speed: {x: 10, y: 10, zoom: 0.02},
          bindToWindow: true,
        },
        multiselect: false,
        navigationButtons: false,
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
              treeSpacing: 10,
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
