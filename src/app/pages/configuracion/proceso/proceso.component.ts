import { Component, OnInit } from '@angular/core';
import { Network, DataSet } from 'vis';

@Component({
  selector: 'ngx-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.scss'],
})
export class ProcesoComponent implements OnInit {

  public nodes: any[];
  public edges: any[];
  public network: Network;
  public params: any;

  getNodeById(id) {
    let node = null;
    this.nodes.forEach(element => {
      if (element.id === id) {
        node = element;
      }
    });
    return node;
  }

  constructor() {
  }

  clicknode(params) {
    this.params = params.nodes[0];
  };

  draw(nodes, edges) {
  const nodesDS = new DataSet(nodes);
  // create an array with edges
  const edgesDS = new DataSet(edges);
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
  const network = new Network(container, data, options);

  network.on('selectNode', this.clicknode );
  };

  ngOnInit() {
    this.nodes = [
    {id: 1, label: 'Node 1'},
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'},
    ];
    this.edges = [
      {from: 1, to: 3},
      {from: 1, to: 2},
      {from: 2, to: 4},
      {from: 2, to: 5},
      {from: 3, to: 3},
    ]
    this.draw(this.nodes, this.edges);
  };
}
