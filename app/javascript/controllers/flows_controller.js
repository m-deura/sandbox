import { Controller } from "@hotwired/stimulus";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import cytoscapePopper from 'cytoscape-popper';
import { createPopper } from '@popperjs/core';

cytoscape.use(cytoscapePopper(createPopper));

cytoscape.use(dagre);

export default class extends Controller {
  static targets = ["cy", "drawer", "drawerTitle", "drawerContent"];

  connect() {
    const url = '/api/v1/charts/1'
    fetch(url)
    .then(response => response.json())
    .then(elements_data => {
      this.cy = cytoscape({
        container: this.cyTarget,
        autoungrabify: true,
        elements: elements_data,
        style: [
          {
            selector: "node",
            style: {
              shape: "round-rectangle",
              width: 100,
              height: 15,
              "background-color": "#FFFFFF",
              label: "data(label)",
              "text-valign": "center",
              "text-halign": "center",
              "color": "#505050",
              "font-size": "8px",
              "padding": "4px",
              'border-width': 0.5,
              'border-color': '#000',
              'border-style': 'solid',
              'border-cap': "square"
            },
          },
          {
            selector: "edge",
            style: {
              "curve-style": "round-taxi",
              width: 0.5,
              "line-color": "#b1b1b6",
              "target-arrow-shape": "none",
              "taxi-radius": 3,
              "taxi-turn": "20px", // 曲がり角の位置として、ソースノードからの絶対距離を指定す  る（指定しないとソースノードとターゲットノードの相対距離によって位置算出が行われるら  しく、同列ノードの曲がり角の位置がズレる）
            },
          },
        ],
        layout: {
          name: "dagre",
          rankDir: "LR",
          nodeSep: 10,
          edgeSep: 10,
          ranker: "tight-tree",
        },
      });
      this.cy.on("tap", "node", (evt) => {
        const node = evt.target;
        this.showDrawer(node.data());
      });

      this.cy.ready(() => {
        this.cy.nodes().forEach((node) => {
          this.addButtonsToNode(node);
        });
      });
    });
  }
  
addButtonsToNode(node) {
  const popperRef = node.popperRef();
  console.log("popperRef for node", node.id(), popperRef);

  const dummyDomEle = document.createElement("div");
  dummyDomEle.classList.add("node-toolbar");
  dummyDomEle.innerHTML = `
    <button data-action="click->graph#addNode" data-node-id="${node.id()}">＋</button>
    <button data-action="click->graph#toggleCollapse" data-node-id="${node.id()}">－</button>
  `;
  this.cy.container().appendChild(dummyDomEle);
  console.log("Appended toolbar for", node.id(), dummyDomEle);
  
const update = () => {
  const rect = popperRef.getBoundingClientRect();
  dummyDomEle.style.left = `${rect.x + window.scrollX}px`;
  dummyDomEle.style.top = `${rect.y + window.scrollY}px`;

  console.log("Bounding rect for", node.id(), popperRef.getBoundingClientRect());
};


  this.cy.on('position', node, update);
  update();
}

  addNode(event) {
    const parentId = event.target.dataset.nodeId;
    console.log("Add node under:", parentId);
    // ここでモーダルを開くなど
  }

  toggleCollapse(event) {
    const nodeId = event.target.dataset.nodeId;
    console.log("Toggle collapse for:", nodeId);
    // 子ノードを一時非表示にする処理を書く（必要ならここに）
  }

  showDrawer(data) {
    this.drawerTitleTarget.textContent = data.label;
    // this.drawerContentTarget.textContent = ノードID: ${data.id};
    this.drawerTarget.classList.remove("translate-x-full");
    this.drawerTarget.classList.add("translate-x-0");
  }
}
