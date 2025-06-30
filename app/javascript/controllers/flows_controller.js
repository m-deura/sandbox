import { Controller } from "@hotwired/stimulus";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";

cytoscape.use(dagre);

export default class extends Controller {
  static targets = ["cy", "drawer", "drawerTitle", "drawerContent"];

  connect() {
    this.cy = cytoscape({
      container: this.cyTarget,
      autoungrabify: true,
      elements: [
        { data: { id: "1", label: "BOTTOM" } },
        { data: { id: "2", label: "クローズドガード" } },
        { data: { id: "3", label: "草刈り" } },
        { data: { id: "4", label: "パスガード" } },
        { data: { id: "5", label: "サンプル1" } },
        { data: { id: "6", label: "サンプル2" } },
        { data: { id: "7", label: "サンプル3" } },
        { data: { id: "8", label: "サンプル4" } },
        { data: { id: "9", label: "TOP" } },
        { data: { id: "10", label: "サンプル5" } },
        { data: { id: "11", label: "サンプル6" } },
        { data: { id: "12", label: "サンプル7" } },
        { data: { id: "13", label: "サンプル8" } },
        { data: { id: "14", label: "サンプル9" } },
        { data: { id: "15", label: "サンプル10" } },
        { data: { id: "16", label: "サンプル11" } },
        { data: { source: "1", target: "2" } },
        { data: { source: "2", target: "3" } },
        { data: { source: "2", target: "4" } },
        { data: { source: "2", target: "5" } },
        { data: { source: "1", target: "6" } },
        { data: { source: "6", target: "7" } },
        { data: { source: "6", target: "8" } },
        { data: { source: "9", target: "10" } },
        { data: { source: "9", target: "11" } },
        { data: { source: "10", target: "12" } },
        { data: { source: "10", target: "13" } },
        { data: { source: "10", target: "14" } },
        { data: { source: "10", target: "15" } },
        { data: { source: "11", target: "16" } },
      ],
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
            "taxi-turn": "20px", // 曲がり角の位置として、ソースノードからの絶対距離を指定する（指定しないとソースノードとターゲットノードの相対距離によって位置算出が行われるらしく、同列ノードの曲がり角の位置がズレる）
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
  }

  showDrawer(data) {
    this.drawerTitleTarget.textContent = data.label;
    // this.drawerContentTarget.textContent = `ノードID: ${data.id}`;
    this.drawerTarget.classList.remove("translate-x-full");
    this.drawerTarget.classList.add("translate-x-0");
  }
}
